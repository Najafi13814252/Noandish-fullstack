"use server"

import { Prisma } from "@/generated/prisma/client"

import { prisma } from "@/lib/prisma"
import {
    getEffectivePrice,
    RATING_RANGES,
    type CourseFilters,
    type PriceBounds,
} from "@/lib/course-filters"

export async function getCourses() {
    const courses = await prisma.course.findMany()

    return courses
}

/**
 * دوره‌های صفحهٔ /courses بر اساس فیلترها.
 * فیلتر نوع و امتیاز در دیتابیس اعمال می‌شود؛ قیمت مؤثر (بعد از تخفیف) و مرتب‌سازی
 * در جاوااسکریپت انجام می‌شود چون با ستون خام `price` قابل بیان نیستند.
 * برای کاتالوگ‌های خیلی بزرگ این منطق باید به SQL منتقل شود.
 */
async function fetchFilteredCourses(filters: CourseFilters) {
    const where: Prisma.CourseWhereInput = {}

    if (filters.type === "free") {
        where.discount = { gte: 100 }
    } else if (filters.type === "paid") {
        where.discount = { lt: 100 }
    }

    if (filters.ratings.length > 0) {
        where.OR = filters.ratings.map(key => {
            const range = RATING_RANGES.find(r => r.key === key)!

            return key === "4.5-5"
                ? { rate: { gte: range.min, lte: range.max } }
                : { rate: { gte: range.min, lt: range.max } }
        })
    }

    const courses = await prisma.course.findMany({
        where,
        include: {
            teacher: true,
        },
    })

    const filtered = courses.filter(course => {
        const price = getEffectivePrice(course)

        if (filters.minPrice !== null && price < filters.minPrice) {
            return false
        }

        if (filters.maxPrice !== null && price > filters.maxPrice) {
            return false
        }

        return true
    })

    sortCourses(filtered, filters.sort)

    return filtered
}

export async function getFilteredCourses(filters: CourseFilters) {
    return fetchFilteredCourses(filters)
}

/** تعداد دوره‌های مطابق با فیلترها؛ برای نمایش در انتهای نوار مرتب‌سازی */
export async function countFilteredCourses(filters: CourseFilters) {
    const courses = await fetchFilteredCourses(filters)

    return courses.length
}

type CourseWithTeacher = Prisma.CourseGetPayload<{ include: { teacher: true } }>

function sortCourses(
    courses: CourseWithTeacher[],
    sort: CourseFilters["sort"],
) {
    switch (sort) {
        case "popular":
            courses.sort(
                (a, b) =>
                    b.members - a.members ||
                    b.createdAt.getTime() - a.createdAt.getTime(),
            )
            break
        case "discount":
            // رایگان‌ها (تخفیف ۱۰۰٪) در رتبه‌بندی تخفیف شرکت نمی‌کنند و به انتهای لیست می‌روند
            courses.sort((a, b) => {
                const aFree = a.discount >= 100
                const bFree = b.discount >= 100

                if (aFree !== bFree) {
                    return aFree ? 1 : -1
                }

                if (!aFree && !bFree) {
                    return b.discount - a.discount
                }

                return b.createdAt.getTime() - a.createdAt.getTime()
            })
            break
        case "newest":
        default:
            courses.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            break
    }
}

/** بازهٔ قیمتی اسلایدر: از صفر تا بیشترین قیمت مؤثر بین همهٔ دوره‌ها */
export async function getPriceBounds(): Promise<PriceBounds> {
    const courses = await prisma.course.findMany({
        select: {
            price: true,
            discount: true,
        },
    })

    const max = courses.reduce(
        (currentMax, course) => Math.max(currentMax, getEffectivePrice(course)),
        0,
    )

    // اگر هنوز دورهٔ نقدی‌ای وجود نداشت یک بازهٔ پیش‌فرض برمی‌گردد
    const resolvedMax = max > 0 ? max : 1_000_000

    return {
        min: 0,
        max: resolvedMax,
        step: 10 ** Math.max(1, Math.floor(Math.log10(resolvedMax)) - 1),
    }
}

export async function getCourse(courseId: string) {
    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        },
        include: {
            teacher: true
        }
    })

    return course
}

export async function getChaptersWithLessons(courseId: string) {
    const chapters = await prisma.chapter.findMany({
        where: {
            courseId
        },
        include: {
            lessons: true
        }
    })

    return chapters
}