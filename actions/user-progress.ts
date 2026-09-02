"use server"

import { currentUser } from "@clerk/nextjs/server"

import { prisma } from "@/lib/prisma"

import { Course } from "@/generated/prisma/client"

/** دوره‌ای از «دوره‌های من» به‌همراه آمار پیشرفت واقعی کاربر */
export type MyCourse = {
    course: Course
    totalLessons: number
    completedLessons: number
    progress: number
}

/**
 * دوره‌های کاربر واردشده را برمی‌گرداند: دوره‌هایی که خریده است (پرداخت موفق)
 * یا حداقل یک جلسه‌شان را دیده است، به‌همراه درصد پیشرفت واقعی
 * (جلسات کامل‌دیده‌شده ÷ کل جلسات).
 */
export async function getMyCourses(): Promise<MyCourse[]> {
    const user = await currentUser()

    if (!user) {
        return []
    }

    const courses = await prisma.course.findMany({
        where: {
            OR: [
                {
                    chapters: {
                        some: {
                            lessons: {
                                some: {
                                    userProgresses: {
                                        some: { userId: user.id },
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    payments: {
                        some: { userId: user.id, status: "SUCCESS" },
                    },
                },
            ],
        },
        include: {
            chapters: {
                include: {
                    lessons: {
                        include: {
                            userProgresses: {
                                where: { userId: user.id },
                                select: { isComplated: true },
                            },
                        },
                    },
                },
            },
        },
    })

    return courses.map(course => {
        const lessons = course.chapters.flatMap(chapter => chapter.lessons)

        const totalLessons = lessons.length
        const completedLessons = lessons.filter(lesson =>
            lesson.userProgresses.some(progress => progress.isComplated)
        ).length

        return {
            course,
            totalLessons,
            completedLessons,
            progress: totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100),
        }
    })
}

/**
 * وضعیت «کامل دیدم» یک درس را برای کاربر واردشده تغییر می‌دهد
 * و وضعیت جدید (دیده‌شده/نشده) را برمی‌گرداند.
 */
export async function toggleLessonProgress(lessonId: string): Promise<boolean> {
    const user = await currentUser()

    if (!user) {
        throw new Error("برای ثبت پیشرفت ابتدا وارد حساب خود شوید.")
    }

    const existing = await prisma.userProgress.findUnique({
        where: {
            userId_lessonId: { userId: user.id, lessonId },
        },
    })

    // رکورد قبلی هست → فقط پرچم را برعکس می‌کنیم تا سابقه ثبت حفظ شود
    if (existing) {
        const next = !existing.isComplated

        await prisma.userProgress.update({
            where: { id: existing.id },
            data: { isComplated: next },
        })

        return next
    }

    await prisma.userProgress.create({
        data: {
            userId: user.id,
            lessonId,
            isComplated: true,
        },
    })

    return true
}
