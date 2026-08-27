"use client";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpenIcon, CheckmarkCircle02Icon, Clock01Icon, GraduationCapIcon, LanguageCircleIcon, ShoppingCart01Icon, UserMultipleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { courseDetailType } from "@/fake-data/course-details";
import { courseType } from "@/fake-data/courses";

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

type CoursePurchaseCardProps = {
    course: courseType;
    detail: courseDetailType;
};

function CoursePurchaseCard({ course, detail }: CoursePurchaseCardProps) {
    const finalPrice = course.price - (course.price * course.discount / 100);
    const isFree = course.discount === 100;

    const handleBuy = () => {
        toast.success("به زودی فرآیند خرید فعال می‌شود!");
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

                {course.discount > 0 && (
                    <div className="mt-2 flex items-center gap-2 text-left">
                        <span className="rounded-md bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                            {course.discount.toLocaleString('fa-IR')}٪ تخفیف
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                            {course.price.toLocaleString('fa-IR')}
                        </span>
                    </div>
                )}
            </section>

            {/* دکمه خرید */}
            <Button size="lg" className="w-full dark:bg-primary/20" onClick={handleBuy}>
                <HugeiconsIcon icon={ShoppingCart01Icon} className="size-5" />
                {isFree ? "شرکت در دوره" : "خرید دوره"}
            </Button>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* جزئیات دوره */}
            <section className="flex flex-col gap-4 text-sm">
                <DetailRow icon={Clock01Icon} label="مدت زمان دوره">
                    {course.duration.toLocaleString('fa-IR')} ساعت
                </DetailRow>

                <DetailRow icon={BookOpenIcon} label="تعداد جلسات">
                    {course.lesson.toLocaleString('fa-IR')} جلسه
                </DetailRow>

                <DetailRow icon={UserMultipleIcon} label="تعداد دانشجویان">
                    {course.members.toLocaleString('fa-IR')} نفر
                </DetailRow>

                <DetailRow icon={CheckmarkCircle02Icon} label="پیش‌نیاز">
                    {detail.prerequisites.length > 0 ? "دارد" : "ندارد"}
                </DetailRow>

                <DetailRow icon={LanguageCircleIcon} label="زبان دوره">
                    {detail.language}
                </DetailRow>

                <DetailRow icon={GraduationCapIcon} label="مدرس">
                    {course.teacher}
                </DetailRow>
            </section>
        </Card>
    );
}

export default CoursePurchaseCard;
