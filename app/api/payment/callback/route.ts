import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { verifyAndFinalize } from "@/actions/payment";

/**
 * آدرس بازگشت از درگاه زرین‌پال. این مسیر public است چون زرین‌پال مرورگر کاربر را
 * بدون نشست احراز هویت به این‌جا هدایت می‌کند؛ امنیت از طریق تأیید تراکنش
 * با زرین‌پال و مبلغ ذخیره‌شده در دیتابیس تأمین می‌شود.
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get("orderId");
    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    if (!orderId || !authority) {
        redirect("/payment/result?status=error");
    }

    const result = await verifyAndFinalize(orderId, authority, status === "OK");

    if (result.success) {
        redirect(`/payment/result?status=success${result.refId ? `&refId=${result.refId}` : ""}`);
    }

    redirect("/payment/result?status=failure");
}
