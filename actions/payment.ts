"use server"

import { currentUser } from "@clerk/nextjs/server"
import { randomUUID } from "node:crypto"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { getCouponPercent } from "@/lib/discount-codes"
import { prisma } from "@/lib/prisma"
import { getStartPayUrl, requestPayment, verifyPayment } from "@/lib/zarinpal"
import type { PaymentStatus } from "@/generated/prisma/client"

/**
 * مبلغ نهایی یک دوره به تومان با احتساب تخفیف دوره و درصد کد تخفیف.
 * همه مبالغ سمت سرور محاسبه می‌شوند تا کلاینت نتواند مبلغ را تغییر دهد.
 */
function computeCourseAmount(price: number, discount: number, couponPercent: number): number {
    const effective = Math.floor(price - (price * discount) / 100)
    return couponPercent > 0 ? Math.floor((effective * (100 - couponPercent)) / 100) : effective
}

/** مسیرهایی که بعد از هر تغییر در پرداخت‌ها باید دوباره ساخته شوند. */
function revalidatePurchasePaths() {
    revalidatePath("/cart")
    revalidatePath("/user/profile/purchases")
    revalidatePath("/user/profile/stats")
}

/**
 * فرآیند خرید سبد را شروع می‌کند: مبلغ را از دیتابیس محاسبه می‌کند،
 * تراکنش زرین‌پال را می‌سازد و کاربر را به صفحه پرداخت هدایت می‌کند.
 * دوره‌های رایگان (مبلغ صفر) بدون درگاه مستقیم ثبت می‌شوند.
 */
export async function checkoutCart(couponCode?: string): Promise<void> {
    const user = await currentUser()

    if (!user) {
        throw new Error("برای پرداخت ابتدا وارد حساب خود شوید.")
    }

    const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: { items: { include: { course: true } } },
    })

    if (!cart || cart.items.length === 0) {
        throw new Error("سبد خرید شما خالی است.")
    }

    // دوره‌هایی که قبلاً خریده شده‌اند از سبد حذف می‌شوند تا دوباره هزینه نشوند
    const purchased = await prisma.payment.findMany({
        where: { userId: user.id, status: "SUCCESS" },
        select: { courseId: true },
    })

    const purchasedIds = new Set(purchased.map(item => item.courseId))
    const payableItems = cart.items.filter(item => !purchasedIds.has(item.courseId))

    if (payableItems.length === 0) {
        throw new Error("همه دوره‌های سبد شما قبلاً خریداری شده‌اند.")
    }

    if (payableItems.length < cart.items.length) {
        await prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id,
                courseId: { in: cart.items.filter(item => purchasedIds.has(item.courseId)).map(item => item.courseId) },
            },
        })
    }

    const couponPercent = getCouponPercent(couponCode)

    const rows = payableItems.map(item => ({
        courseId: item.courseId,
        amount: computeCourseAmount(item.course.price, item.course.discount, couponPercent),
    }))

    const totalToman = rows.reduce((sum, row) => sum + row.amount, 0)
    const orderId = randomUUID()

    // مبلغ صفر (دوره رایگان) نیاز به درگاه ندارد
    if (totalToman === 0) {
        await prisma.$transaction(async tx => {
            for (const row of rows) {
                await tx.payment.create({
                    data: {
                        userId: user.id,
                        courseId: row.courseId,
                        amount: 0,
                        orderId,
                        status: "SUCCESS",
                    },
                })

                await tx.course.update({
                    where: { id: row.courseId },
                    data: { members: { increment: 1 } },
                })
            }

            await tx.cartItem.deleteMany({
                where: { cartId: cart.id, courseId: { in: rows.map(row => row.courseId) } },
            })
        })

        revalidatePurchasePaths()
        redirect("/payment/result?status=success")
    }

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/+$/, "")

    const authority = await requestPayment({
        amountToman: totalToman,
        description: `خرید ${rows.length.toLocaleString("fa-IR")} دوره آموزشی از نواندیش`,
        callbackUrl: `${appUrl}/api/payment/callback?orderId=${orderId}`,
        orderId,
        email: user.emailAddresses[0]?.emailAddress,
    })

    await prisma.$transaction(async tx => {
        for (const row of rows) {
            await tx.payment.create({
                data: {
                    userId: user.id,
                    courseId: row.courseId,
                    amount: row.amount,
                    orderId,
                    authority,
                },
            })
        }
    })

    redirect(getStartPayUrl(authority))
}

/**
 * دوره رایگان را بدون درگاه برای کاربر ثبت‌نام می‌کند و به اولین درس هدایت می‌کند.
 */
export async function enrollFreeCourse(courseId: string): Promise<void> {
    const user = await currentUser()

    if (!user) {
        throw new Error("برای شرکت در دوره ابتدا وارد حساب خود شوید.")
    }

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: { id: true, discount: true },
    })

    if (!course || course.discount !== 100) {
        throw new Error("این دوره رایگان نیست و باید از طریق درگاه پرداخت خریداری شود.")
    }

    // اولین درس دوره برای هدایت بعد از ثبت‌نام
    const firstChapter = await prisma.chapter.findFirst({
        where: { courseId },
        include: { lessons: { take: 1, select: { id: true } } },
    })

    const firstLesson = firstChapter?.lessons[0]
    const firstLessonHref = firstChapter && firstLesson
        ? `/courses/${courseId}/chapters/${firstChapter.id}?lesson=${firstLesson.id}`
        : `/courses/${courseId}`

    // اگر قبلاً ثبت‌نام شده باشد فقط به اولین درس هدایت می‌شود
    const existing = await prisma.payment.findFirst({
        where: { userId: user.id, courseId, status: "SUCCESS" },
        select: { id: true },
    })

    if (!existing) {
        await prisma.$transaction(async tx => {
            await tx.payment.create({
                data: {
                    userId: user.id,
                    courseId,
                    amount: 0,
                    orderId: randomUUID(),
                    status: "SUCCESS",
                },
            })

            await tx.course.update({
                where: { id: courseId },
                data: { members: { increment: 1 } },
            })
        })
    }

    revalidatePath("/user/profile/purchases")
    revalidatePath("/user/profile/stats")
    revalidatePath(`/courses/${courseId}`)

    redirect(firstLessonHref)
}

export type VerifyAndFinalizeResult = {
    success: boolean;
    refId: string | null;
};

/**
 * نتیجه برگشت کاربر از درگاه را پردازش می‌کند: تراکنش را با زرین‌پال تأیید
 * می‌کند و در موفقیت ردیف‌های پرداخت سفارش را SUCCESS می‌کند، تعداد اعضای
 * دوره‌ها را زیاد می‌کند و سبد را خالی می‌کند.
 * این تابع idempotent است چون ممکن است callback چند بار صدا زده شود.
 */
export async function verifyAndFinalize(orderId: string, authority: string, ok: boolean): Promise<VerifyAndFinalizeResult> {
    const payments = await prisma.payment.findMany({
        where: { orderId },
        select: { id: true, userId: true, courseId: true, amount: true, status: true, refId: true },
    })

    if (payments.length === 0) {
        return { success: false, refId: null }
    }

    // پرداخت ناموفق یا انصراف کاربر از درگاه
    if (!ok) {
        await prisma.payment.updateMany({
            where: { orderId, status: "PENDING" },
            data: { status: "FAILED" },
        })

        return { success: false, refId: null }
    }

    // اگر قبلاً تأیید شده باشد، بدون verify مجدد همان نتیجه برمی‌گردد
    const alreadyVerified = payments.find(item => item.status === "SUCCESS")

    if (alreadyVerified) {
        return { success: true, refId: alreadyVerified.refId }
    }

    // مبلغ تأیید همیشه از دیتابیس خوانده می‌شود، نه از پارامترهای callback
    const totalToman = payments.reduce((sum, item) => sum + item.amount, 0)
    const result = await verifyPayment({ amountToman: totalToman, authority })

    if (!result.success) {
        await prisma.payment.updateMany({
            where: { orderId, status: "PENDING" },
            data: { status: "FAILED" },
        })

        return { success: false, refId: null }
    }

    await prisma.$transaction(async tx => {
        for (const payment of payments) {
            const updated = await tx.payment.updateMany({
                where: { id: payment.id, status: "PENDING" },
                data: { status: "SUCCESS", refId: result.refId },
            })

            // اعضای دوره فقط وقتی زیاد می‌شود که این ردیف برای اولین بار موفق شده باشد
            if (updated.count === 1) {
                await tx.course.update({
                    where: { id: payment.courseId },
                    data: { members: { increment: 1 } },
                })
            }
        }

        await tx.cartItem.deleteMany({
            where: {
                cart: { userId: payments[0].userId },
                courseId: { in: payments.map(item => item.courseId) },
            },
        })
    })

    revalidatePurchasePaths()

    for (const payment of payments) {
        revalidatePath(`/courses/${payment.courseId}`)
    }

    return { success: true, refId: result.refId }
}

/**
 * بررسی می‌کند که آیا کاربر واردشده دوره را خریده است یا نه.
 */
export async function isCoursePurchased(courseId: string): Promise<boolean> {
    const user = await currentUser()

    if (!user) {
        return false
    }

    const payment = await prisma.payment.findFirst({
        where: { userId: user.id, courseId, status: "SUCCESS" },
        select: { id: true },
    })

    return payment !== null
}

export type PurchaseHistoryItem = {
    id: string;
    courseTitle: string;
    amount: number;
    status: PaymentStatus;
    method: "رایگان" | "درگاه پرداخت";
    date: string;
    refId: string | null;
};

export type PurchaseStatsData = {
    totalCount: number;
    totalPaid: number;
    activeCourses: number;
    history: PurchaseHistoryItem[];
};

/**
 * آمار خرید کاربر واردشده را برای صفحه «آمار خرید» برمی‌گرداند.
 */
export async function getPurchaseStats(): Promise<PurchaseStatsData> {
    const user = await currentUser()

    if (!user) {
        return { totalCount: 0, totalPaid: 0, activeCourses: 0, history: [] }
    }

    const payments = await prisma.payment.findMany({
        where: { userId: user.id },
        include: { course: { select: { title: true } } },
        orderBy: { createdAt: "desc" },
    })

    const successful = payments.filter(item => item.status === "SUCCESS")

    return {
        totalCount: payments.length,
        totalPaid: successful.reduce((sum, item) => sum + item.amount, 0),
        activeCourses: new Set(successful.map(item => item.courseId)).size,
        history: payments.map(item => ({
            id: item.id,
            courseTitle: item.course.title,
            amount: item.amount,
            status: item.status,
            method: item.amount === 0 ? "رایگان" : "درگاه پرداخت",
            date: new Date(item.createdAt).toLocaleDateString("fa-IR"),
            refId: item.refId,
        })),
    }
}
