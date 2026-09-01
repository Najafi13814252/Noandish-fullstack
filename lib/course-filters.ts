/**
 * پارس و اعتبارسنجی فیلترهای صفحهٔ /courses از روی searchParams.
 * هم در کامپوننت‌های سرور (page / grid) و هم در کلاینت (filters / sort) استفاده می‌شود.
 */

export type CourseTypeFilter = "free" | "paid" | null

export type CourseSort = "newest" | "discount" | "popular"

export const SORT_OPTIONS: { value: CourseSort; label: string }[] = [
    { value: "newest", label: "جدیدترین" },
    { value: "discount", label: "بیشترین تخفیف" },
    { value: "popular", label: "پرمخاطب‌ترین" },
]

/** بازه‌های امتیاز قابل فیلتر؛ مرز پایین بسته و مرز بالا باز است (به‌جز بازهٔ آخر) */
export const RATING_RANGES = [
    { key: "3.5-4", label: "۳.۵ تا ۴", min: 3.5, max: 4 },
    { key: "4-4.5", label: "۴ تا ۴.۵", min: 4, max: 4.5 },
    { key: "4.5-5", label: "۴.۵ تا ۵", min: 4.5, max: 5 },
] as const

export type RatingKey = (typeof RATING_RANGES)[number]["key"]

export type CourseFilters = {
    /** نوع دوره: رایگان / نقدی (null یعنی همه) */
    type: CourseTypeFilter
    /** کف قیمت مؤثر (بعد از تخفیف) به تومان؛ null یعنی بدون محدودیت */
    minPrice: number | null
    /** سقف قیمت مؤثر (بعد از تخفیف) به تومان؛ null یعنی بدون محدودیت */
    maxPrice: number | null
    /** بازه‌های امتیاز انتخاب‌شده (چند انتخابی) */
    ratings: RatingKey[]
    sort: CourseSort
}

export type PriceBounds = {
    min: number
    max: number
    step: number
}

const RATING_KEYS = RATING_RANGES.map(range => range.key)

function toNumber(value: string | string[] | undefined): number | null {
    if (value === undefined || Array.isArray(value)) {
        return null
    }

    const parsed = Number(value)

    if (!Number.isFinite(parsed) || parsed < 0) {
        return null
    }

    return Math.floor(parsed)
}

function toString(value: string | string[] | undefined): string | null {
    if (value === undefined || Array.isArray(value)) {
        return null
    }

    return value.trim() === "" ? null : value
}

function toArray(value: string | string[] | undefined): string[] {
    if (value === undefined) {
        return []
    }

    return Array.isArray(value) ? value : [value]
}

export function parseCourseFilters(
    searchParams: Record<string, string | string[] | undefined>,
): CourseFilters {
    const type = toString(searchParams.type)

    const min = toNumber(searchParams.min)
    const max = toNumber(searchParams.max)

    const sortValue = toString(searchParams.sort)
    const sort = SORT_OPTIONS.some(option => option.value === sortValue)
        ? (sortValue as CourseSort)
        : "newest"

    return {
        type: type === "free" || type === "paid" ? type : null,
        // اگر کف از سقف بیشتر شد جابه‌جا می‌شوند تا بازه همیشه معتبر بماند
        minPrice: min !== null && max !== null ? Math.min(min, max) : min,
        maxPrice: min !== null && max !== null ? Math.max(min, max) : max,
        ratings: Array.from(new Set(toArray(searchParams.rating).filter(
            (value): value is RatingKey => RATING_KEYS.includes(value as RatingKey),
        ))),
        sort,
    }
}

/** تعداد فیلترهای فعال؛ برای نشان بدج روی دکمهٔ فیلتر موبایل */
export function countActiveFilters(filters: CourseFilters): number {
    let count = 0

    if (filters.type !== null) count++
    if (filters.minPrice !== null || filters.maxPrice !== null) count++
    count += filters.ratings.length

    return count
}

/** کلید یکتا از فیلترها؛ برای key ساسپنس گرید تا هنگام تغییر فیلتر اسکلتون نمایش داده شود */
export function serializeFilters(filters: CourseFilters): string {
    return `${filters.type ?? "all"}|${filters.minPrice ?? ""}|${filters.maxPrice ?? ""}|${filters.ratings.join(",")}|${filters.sort}`
}

/** قیمت مؤثر دوره (بعد از اعمال تخفیف) به تومان؛ دورهٔ رایگان صفر است */
export function getEffectivePrice(course: { price: number; discount: number }): number {
    if (course.discount >= 100) {
        return 0
    }

    return Math.round((course.price * (100 - course.discount)) / 100)
}
