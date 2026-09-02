import type { Metadata } from "next";

/**
 * پیکربندی مشترک سئو و متادیتای سایت.
 * همهٔ مقادیر متادیتا، sitemap، robots و structured data از همین فایل خوانده می‌شوند.
 */
export const SITE_NAME = "نواندیش"

export const SITE_ORGANIZATION_NAME = "بنیاد تعالی آموزش نواندیش"

/** دامنهٔ اصلی سایت — در محیط تولید مقدار NEXT_PUBLIC_APP_URL را در .env به دامنهٔ واقعی تغییر دهید */
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

export const SITE_DESCRIPTION =
    "نواندیش؛ بنیاد تعالی آموزش‌های تخصصی — آموزش‌های تخصصی همراه با توسعه فردی برای سازمان‌ها و شرکت‌ها با بهترین و مجرب‌ترین اساتید ایران، از مبتدی تا پیشرفته"

export const SITE_KEYWORDS = [
    "نواندیش",
    "آموزش تخصصی",
    "دوره آنلاین",
    "توسعه فردی",
    "آموزش سازمانی",
    "دوره آموزشی",
    "آموزش مجازی",
]

/** عنوان پیش‌فرض سایت که در صفحهٔ اصلی و متادیتاهای ریشه استفاده می‌شود */
export const SITE_TITLE = "نواندیش | بنیاد تعالی آموزش‌های تخصصی"

/** برش متن به طول دلخواه برای توضیحات متادیتا، بدون شکستن وسط کلمه */
export function truncateText(text: string, maxLength = 160): string {
    if (text.length <= maxLength) {
        return text
    }

    const cut = text.slice(0, maxLength)
    const lastSpace = cut.lastIndexOf(" ")

    return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "…"
}

/**
 * robots برای صفحات خصوصی (سبد خرید، پروفایل و …).
 * googleBot باید صریح ذکر شود وگرنه تنظیمِ لایوت ریشه (index: true) برای گوگل‌بات
 * بر noindex صفحه مقدم می‌شود.
 */
export const NO_INDEX_ROBOTS = {
    index: false,
    follow: false,
    googleBot: {
        index: false,
        follow: false,
    },
} satisfies Metadata["robots"]

/** مثل NO_INDEX_ROBOTS ولی لینک‌های صفحه همچنان دنبال می‌شوند (برای صفحات درس) */
export const NO_INDEX_FOLLOW_ROBOTS = {
    index: false,
    follow: true,
    googleBot: {
        index: false,
        follow: true,
    },
} satisfies Metadata["robots"]
