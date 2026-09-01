"use server"

import { currentUser } from "@clerk/nextjs/server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

/**
 * سبد خرید کاربر را برمی‌گرداند؛ اگر هنوز سبدی نساخته، می‌سازد.
 */
async function getOrCreateCart(userId: string) {
    const cart = await prisma.cart.findUnique({
        where: { userId },
        select: { id: true },
    })

    if (cart) {
        return cart
    }

    return prisma.cart.create({
        data: { userId },
        select: { id: true },
    })
}

/**
 * یک دوره را به سبد خرید کاربر واردشده اضافه می‌کند.
 * اگر دوره از قبل در سبد باشد false و در غیر این صورت true برمی‌گرداند.
 */
export async function addCourseToCart(courseId: string): Promise<boolean> {
    const user = await currentUser()

    if (!user) {
        throw new Error("برای افزودن به سبد خرید ابتدا وارد حساب خود شوید.")
    }

    const cart = await getOrCreateCart(user.id)

    const existing = await prisma.cartItem.findUnique({
        where: {
            cartId_courseId: { cartId: cart.id, courseId },
        },
    })

    if (existing) {
        return false
    }

    await prisma.cartItem.create({
        data: {
            cartId: cart.id,
            courseId,
        },
    })

    revalidatePath("/cart")

    return true
}

/**
 * یک دوره را از سبد خرید کاربر واردشده حذف می‌کند.
 * اگر دوره در سبد نبود false برمی‌گرداند.
 */
export async function removeCourseFromCart(courseId: string): Promise<boolean> {
    const user = await currentUser()

    if (!user) {
        throw new Error("برای حذف از سبد خرید ابتدا وارد حساب خود شوید.")
    }

    const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
        select: { id: true },
    })

    if (!cart) {
        return false
    }

    const item = await prisma.cartItem.findUnique({
        where: {
            cartId_courseId: { cartId: cart.id, courseId },
        },
    })

    if (!item) {
        return false
    }

    await prisma.cartItem.delete({ where: { id: item.id } })

    revalidatePath("/cart")

    return true
}

/**
 * بررسی می‌کند که آیا دوره در سبد خرید کاربر واردشده هست یا نه.
 */
export async function isCourseInCart(courseId: string): Promise<boolean> {
    const user = await currentUser()

    if (!user) {
        return false
    }

    const item = await prisma.cartItem.findFirst({
        where: {
            courseId,
            cart: { userId: user.id },
        },
    })

    return item !== null
}

/**
 * تعداد دوره‌های موجود در سبد خرید کاربر واردشده را برمی‌گرداند.
 */
export async function getCartCount(): Promise<number> {
    const user = await currentUser()

    if (!user) {
        return 0
    }

    return prisma.cartItem.count({
        where: {
            cart: { userId: user.id },
        },
    })
}

/**
 * دوره‌های موجود در سبد خرید کاربر واردشده را (به‌همراه مدرس)
 * به ترتیب اضافه‌شدن برمی‌گرداند.
 */
export async function getCartCourses() {
    const user = await currentUser()

    if (!user) {
        return []
    }

    const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: {
            items: {
                orderBy: { createdAt: "desc" },
                include: {
                    course: {
                        include: { teacher: true },
                    },
                },
            },
        },
    })

    return cart?.items.map((item) => item.course) ?? []
}
