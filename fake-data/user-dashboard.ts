import { cards, courseType } from "./courses";

// دوره‌های مورد علاقه کاربر (می‌تواند شامل دوره‌های خریداری‌شده هم باشد)
export const favoriteCourses: courseType[] = [
    cards[0],
    cards[3],
    cards[5],
    cards[7],
    cards[10],
    cards[12],
];

export type PurchasedCourseType = {
    id: number
    courseId: number
    progress: number
    date: string
    price: number
}

// دوره‌های خریداری‌شده کاربر به همراه درصد پیشرفت
export const purchasedCourses: PurchasedCourseType[] = [
    { id: 1, courseId: 2, progress: 78, date: '۱۴۰۴/۰۵/۱۲', price: 0 },
    { id: 2, courseId: 5, progress: 45, date: '۱۴۰۴/۰۵/۲۸', price: 441000 },
    { id: 3, courseId: 10, progress: 100, date: '۱۴۰۴/۰۴/۰۳', price: 860000 },
    { id: 4, courseId: 13, progress: 12, date: '۱۴۰۴/۰۶/۰۱', price: 440000 },
];

export type PurchaseStatusType = "موفق" | "ناموفق" | "در انتظار";

export type PurchaseHistoryType = {
    id: number
    courseTitle: string
    date: string
    price: number
    status: PurchaseStatusType
    method: string
}

// تاریخچه تراکنش‌های خرید کاربر
export const purchaseHistory: PurchaseHistoryType[] = [
    { id: 1, courseTitle: 'آموزش ICDL پیشرفته', date: '۱۴۰۴/۰۵/۱۲', price: 0, status: 'موفق', method: 'رایگان' },
    { id: 2, courseTitle: 'تفکر استراتژیک', date: '۱۴۰۴/۰۵/۲۸', price: 441000, status: 'موفق', method: 'درگاه پرداخت' },
    { id: 3, courseTitle: 'برنامه‌ریزی', date: '۱۴۰۴/۰۴/۰۳', price: 860000, status: 'موفق', method: 'درگاه پرداخت' },
    { id: 4, courseTitle: 'توسعه فردی', date: '۱۴۰۴/۰۶/۰۱', price: 440000, status: 'در انتظار', method: 'درگاه پرداخت' },
    { id: 5, courseTitle: 'مدیریت حرفه‌ای', date: '۱۴۰۴/۰۳/۲۰', price: 780000, status: 'ناموفق', method: 'کیف پول' },
];
