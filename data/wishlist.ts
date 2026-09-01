"use server"

import { currentUser } from "@clerk/nextjs/server"

import { prisma } from "@/lib/prisma"

/** شناسه دوره‌هایی که کاربر واردشده به علاقه‌مندی‌ها افزوده است؛ برای مهمان‌ها خالی برمی‌گردد */
export async function getWishlistedCourseIds(): Promise<string[]> {
    const user = await currentUser()

    if (!user) {
        return []
    }

    const rows = await prisma.wishlist.findMany({
        where: {
            userId: user.id,
        },
        select: {
            courseId: true,
        },
    })

    return rows.map(row => row.courseId)
}

/** دوره‌های علاقه‌مندی کاربر واردشده برای صفحه پروفایل (جدیدترین اول) */
export async function getWishlistCourses() {
    const user = await currentUser()

    if (!user) {
        return []
    }

    const rows = await prisma.wishlist.findMany({
        where: {
            userId: user.id,
        },
        include: {
            course: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    return rows.map(row => row.course)
}
