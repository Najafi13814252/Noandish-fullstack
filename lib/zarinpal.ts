import "dotenv/config";

/**
 * ارتباط با درگاه پرداخت زرین‌پال (نسخه ۴).
 * آدرس پایه و شناسه پذیرنده از متغیرهای محیطی خوانده می‌شوند تا
 * بدون تغییر کد بتوان بین سندباکس و محیط واقعی جابه‌جا شد.
 */

export type ZarinpalRequestInput = {
    /** مبلغ به تومان (در درخواست به ریال تبدیل می‌شود) */
    amountToman: number;
    description: string;
    callbackUrl: string;
    orderId: string;
    email?: string;
};

export type ZarinpalRequestResponse = {
    data?: {
        code: number;
        message: string;
        authority?: string;
        fee?: number;
        fee_type?: string;
    };
    errors?: { code: number; message: string; validations?: unknown[] }[];
};

export type ZarinpalVerifyResponse = {
    data?: {
        code: number;
        message: string;
        ref_id?: number;
        card_hash?: string;
        card_pan?: string;
        fee?: number;
        fee_type?: string;
    };
    errors?: { code: number; message: string; validations?: unknown[] }[];
};

export type ZarinpalVerifyResult = {
    success: boolean;
    code: number;
    refId: string | null;
};

/** آدرس پایه درگاه را بدون اسلش انتهایی برمی‌گرداند. */
export function getZarinpalBaseUrl(): string {
    const baseUrl = process.env.ZARINPAL_BASE_URL;

    if (!baseUrl) {
        throw new Error("آدرس درگاه پرداخت (ZARINPAL_BASE_URL) تنظیم نشده است.");
    }

    return baseUrl.replace(/\/+$/, "");
}

function getMerchantId(): string {
    const merchantId = process.env.ZARINPAL_MERCHANT_ID;

    if (!merchantId) {
        throw new Error("شناسه پذیرنده درگاه پرداخت (ZARINPAL_MERCHANT_ID) تنظیم نشده است.");
    }

    return merchantId;
}

/** آدرس صفحه پرداخت زرین‌پال که کاربر باید به آن هدایت شود. */
export function getStartPayUrl(authority: string): string {
    return `${getZarinpalBaseUrl()}/pg/StartPay/${authority}`;
}

/**
 * درخواست ایجاد تراکنش از زرین‌پال را می‌فرستد و در موفقیت authority را برمی‌گرداند.
 */
export async function requestPayment(input: ZarinpalRequestInput): Promise<string> {
    const response = await fetch(`${getZarinpalBaseUrl()}/pg/v4/payment/request.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            merchant_id: getMerchantId(),
            amount: input.amountToman * 10,
            description: input.description,
            callback_url: input.callbackUrl,
            metadata: {
                email: input.email,
                order_id: input.orderId,
            },
        }),
    });

    if (!response.ok) {
        throw new Error("خطا در اتصال به درگاه پرداخت. لطفاً دوباره تلاش کنید.");
    }

    const json = (await response.json()) as ZarinpalRequestResponse;

    if (json.data?.code === 100 && json.data.authority) {
        return json.data.authority;
    }

    throw new Error(json.errors?.[0]?.message ?? json.data?.message ?? "خطا در اتصال به درگاه پرداخت.");
}

/**
 * تراکنش را با زرین‌پال تأیید می‌کند.
 * کد ۱۰۰ یعنی پرداخت موفق و کد ۱۰۱ یعنی این تراکنش قبلاً تأیید شده است
 * (هر دو به‌معنای پرداخت موفق در نظر گرفته می‌شوند).
 */
export async function verifyPayment(input: { amountToman: number; authority: string }): Promise<ZarinpalVerifyResult> {
    const response = await fetch(`${getZarinpalBaseUrl()}/pg/v4/payment/verify.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            merchant_id: getMerchantId(),
            amount: input.amountToman * 10,
            authority: input.authority,
        }),
    });

    if (!response.ok) {
        return { success: false, code: 0, refId: null };
    }

    const json = (await response.json()) as ZarinpalVerifyResponse;
    const code = json.data?.code ?? 0;

    if (code === 100 || code === 101) {
        const refId = json.data?.ref_id != null ? String(json.data.ref_id) : null;
        return { success: true, code, refId };
    }

    return { success: false, code, refId: null };
}
