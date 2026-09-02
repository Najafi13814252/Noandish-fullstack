/**
 * کدهای تخفیف سبد خرید؛ هم سمت کلاینت برای پیش‌نمایش مبلغ و هم سمت سرور
 * برای محاسبه مبلغ نهایی استفاده می‌شوند تا کلاینت هیچ‌وقت مبلغ را تحمیل نکند.
 */
export const DISCOUNT_CODES: Record<string, number> = {
    noandish20: 20,
    off10: 10,
};

/**
 * درصد تخفیف یک کد را برمی‌گرداند؛ اگر کد نامعتبر یا خالی باشد صفر.
 */
export function getCouponPercent(code: string | null | undefined): number {
    if (!code) {
        return 0;
    }

    return DISCOUNT_CODES[code.trim().toLowerCase()] ?? 0;
}
