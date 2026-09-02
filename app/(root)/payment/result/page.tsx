import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    ArrowLeft02Icon,
    Cancel01Icon,
    CheckmarkCircle02Icon,
    InformationCircleIcon,
    Playlist02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NO_INDEX_ROBOTS } from "@/lib/seo";

// صفحهٔ داخلی نتیجهٔ پرداخت؛ نباید ایندکس شود
export const metadata: Metadata = {
    title: "نتیجه پرداخت",
    robots: NO_INDEX_ROBOTS,
};

type PaymentResultPageProps = {
    searchParams: Promise<{ status?: string; refId?: string }>;
};

export default async function PaymentResultPage({ searchParams }: PaymentResultPageProps) {
    const { status, refId } = await searchParams;

    const isSuccess = status === "success";
    const isFailure = status === "failure";

    const icon = isSuccess ? CheckmarkCircle02Icon : isFailure ? Cancel01Icon : InformationCircleIcon;
    const iconWrapClass = isSuccess
        ? "bg-emerald-50 text-emerald-500"
        : isFailure
          ? "bg-red-50 text-red-500"
          : "bg-amber-50 text-amber-500";
    const title = isSuccess
        ? "پرداخت با موفقیت انجام شد"
        : isFailure
          ? "پرداخت ناموفق بود"
          : "اطلاعات پرداخت نامعتبر است";
    const description = isSuccess
        ? "دوره‌های خریداری‌شده به حساب شما اضافه شد و از این پس می‌توانید ویدیوهای آن‌ها را تماشا کنید."
        : isFailure
          ? "تراکنش شما تکمیل نشد. در صورت کسر وجه، مبلغ تا ۷۲ ساعت آینده به حساب شما بازمی‌گردد."
          : "نشانی بازگشت از درگاه معتبر نیست. اگر پرداختی انجام داده‌اید از طریق پشتیبانی پیگیری کنید.";

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 md:px-6 lg:py-24">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className={`flex size-28 items-center justify-center rounded-full dark:bg-gray-800 ${iconWrapClass}`}>
                    <HugeiconsIcon icon={icon} className="size-14" />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-heading text-primary md:text-3xl dark:text-slate-200">{title}</h1>
                    <p className="mx-auto max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">{description}</p>
                </div>

                {isSuccess && refId && (
                    <p className="rounded-full bg-teal-50 px-5 py-2 text-sm font-medium text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
                        کد رهگیری: {Number(refId)}
                    </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3">
                    {isSuccess && (
                        <Link href="/user/profile/purchases">
                            <Button size="lg">
                                دوره‌های من
                                <HugeiconsIcon icon={Playlist02Icon} className="size-5" />
                            </Button>
                        </Link>
                    )}

                    {isFailure && (
                        <Link href="/cart">
                            <Button size="lg">
                                تلاش مجدد
                                <HugeiconsIcon icon={ArrowLeft02Icon} className="size-5" />
                            </Button>
                        </Link>
                    )}

                    <Link href="/">
                        <Button size="lg" variant="outline">
                            بازگشت به خانه
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
