"use server"

import { currentUser } from "@clerk/nextjs/server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

/**
 * یک دوره را به علاقه‌مندی‌های کاربر واردشده اضافه یا از آن حذف می‌کند
 * و وضعیت جدید (در علاقه‌مندی‌ها هست/نیست) را برمی‌گرداند.
 */
export async function toggleCourseWishlist(courseId: string): Promise<boolean> {
    const user = await currentUser()

    if (!user) {
        throw new Error("برای افزودن به علاقه‌مندی‌ها ابتدا وارد حساب خود شوید.")
    }

    const existing = await prisma.wishlist.findUnique({
        where: {
            userId_courseId: { userId: user.id, courseId },
        },
    })

    if (existing) {
        await prisma.wishlist.delete({ where: { id: existing.id } })
        return false
    }

    await prisma.wishlist.create({
        data: {
            userId: user.id,
            courseId,
        },
    })

    return true
}
