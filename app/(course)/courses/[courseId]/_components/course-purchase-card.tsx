"use client";

import toast from "react-hot-toast";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpenIcon, CheckmarkCircle02Icon, Clock01Icon, GraduationCapIcon, LanguageCircleIcon, PlayCircleIcon, ShoppingBag03Icon, ShoppingBagAddIcon, UserMultipleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { addCourseToCart } from "@/actions/cart";
import { enrollFreeCourse } from "@/actions/payment";
import { Course } from "@/generated/prisma/client";

type DetailRowProps = {
    icon: React.ComponentProps<typeof HugeiconsIcon>["icon"];
    label: string;
    children: React.ReactNode;
};

function DetailRow({ icon, label, children }: DetailRowProps) {
    return (
        <div className="flex items-center gap-3">
            <HugeiconsIcon icon={icon} className="size-5 shrink-0 text-teal-500" />
            <span className="text-gray-500 dark:text-gray-300">{label}</span>
            <span className="mr-auto text-left text-sm font-medium text-gray-800 dark:text-white">{children}</span>
        </div>
    );
}

type CoursePurchaseCardProps = Course & {
    isInCart: boolean;
    purchased: boolean;
    firstLessonHref: string | null;
};

function CoursePurchaseCard({ price, discount, duration, lesson, members, language, id, isInCart, purchased, firstLessonHref }: CoursePurchaseCardProps) {
    const finalPrice = price - (price * discount / 100);
    const isFree = discount === 100;

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleBuy = () => {
        // دوره رایگان بدون درگاه ثبت‌نام می‌شود
        if (isFree && !purchased) {
            startTransition(async () => {
                try {
                    await enrollFreeCourse(id);
                } catch (error) {
                    toast.error(error instanceof Error ? error.message : "خطا در ثبت‌نام دوره");
                }
            });
            return;
        }

        // اگر دوره از قبل در سبد باشد، کاربر را به صفحه سبد خرید می‌برد
        if (isInCart) {
            router.push("/cart");
            return;
        }

        startTransition(async () => {
            try {
                const added = await addCourseToCart(id);

                if (added) {
                    toast.success("دوره به سبد خرید اضافه شد.");
                } else {
                    toast("این دوره از قبل در سبد خرید شما هست.");
                }

                router.refresh();
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "خطا در افزودن به سبد خرید");
            }
        });
    };

    return (
        <Card className="flex flex-col gap-5 border-teal-200 bg-white p-5 shadow-md shadow-teal-200 dark:bg-gray-800 dark:border-gray-700 dark:shadow-none">
            {/* قیمت و تخفیف */}
            <section>
                {isFree ? (
                    <p className="text-3xl font-heading text-teal-500 dark:text-white">رایگان!</p>
                ) : (
                    <p className="text-2xl font-bold text-gray-800 dark:text-white text-left">
                        {finalPrice.toLocaleString('fa-IR')}
                        <span className="text-sm font-normal text-gray-400"> تومان</span>
                    </p>
                )}

                {discount > 0 && (
                    <div className="mt-2 flex items-center gap-2 text-left">
                        <span className="rounded-md bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                            {discount.toLocaleString('fa-IR')}٪ تخفیف
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                            {price.toLocaleString('fa-IR')}
                        </span>
                    </div>
                )}
            </section>

            {/* دکمه خرید */}
            {purchased ? (
                <Button
                    size="lg"
                    className="w-full dark:bg-primary/10"
                    render={<Link href={firstLessonHref ?? `/courses/${id}`} />}
                >
                    <HugeiconsIcon icon={PlayCircleIcon} className="size-5" />
                    ورود به دوره
                </Button>
            ) : (
                <Button
                    size="lg"
                    className="w-full dark:bg-primary/10"
                    variant={isInCart ? "outline" : "default"}
                    disabled={isPending}
                    onClick={handleBuy}
                >
                    <HugeiconsIcon icon={isInCart ? ShoppingBag03Icon : ShoppingBagAddIcon} className="size-5" />
                    {isInCart ? "مشاهده سبد خرید" : isFree ? "شرکت در دوره" : "خرید دوره"}
                </Button>
            )}

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* جزئیات دوره */}
            <section className="flex flex-col gap-4 text-sm">
                <DetailRow icon={Clock01Icon} label="مدت زمان دوره">
                    {duration.toLocaleString('fa-IR')} ساعت
                </DetailRow>

                <DetailRow icon={BookOpenIcon} label="تعداد جلسات">
                    {lesson.toLocaleString('fa-IR')} جلسه
                </DetailRow>

                <DetailRow icon={UserMultipleIcon} label="تعداد دانشجویان">
                    {members.toLocaleString('fa-IR')} نفر
                </DetailRow>

                <DetailRow icon={CheckmarkCircle02Icon} label="پیش‌نیاز">
                    {/* {prerequisites.length > 0 ? "دارد" : "ندارد"} */}
                    ندارد
                </DetailRow>

                <DetailRow icon={LanguageCircleIcon} label="زبان دوره">
                    {language}
                </DetailRow>

                <DetailRow icon={GraduationCapIcon} label="مدرس">
                    علی احمدی
                </DetailRow>
            </section>
        </Card>
    );
}

export default CoursePurchaseCard;
