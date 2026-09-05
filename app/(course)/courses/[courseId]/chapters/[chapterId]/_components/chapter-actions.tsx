"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft01Icon, ArrowRight01Icon, CheckmarkCircle02Icon, EyeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";
import { toggleLessonProgress } from "@/actions/user-progress";

import { Lesson } from "@/generated/prisma/client";

type LessonTarget = {
    chapterId: string;
    lessonId: string;
};

type ChapterActionsProps = {
    courseId: string;
    lesson: Lesson;
    /** ویدئو قفل است و دکمه «کامل دیدم» غیرفعال می‌شود */
    locked: boolean;
    /** وضعیت «کامل دیده‌شده» این درس برای کاربر واردشده (از سرور می‌آید) */
    completed: boolean;
    prev?: LessonTarget;
    next?: LessonTarget;
};

function ChapterActions({ courseId, lesson, locked, completed, prev, next }: ChapterActionsProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleToggleCompleted = () => {
        startTransition(async () => {
            try {
                const nextCompleted = await toggleLessonProgress(lesson.id);

                if (nextCompleted) {
                    toast.success("این ویدئو به‌عنوان «کامل دیده‌شده» ثبت شد.");
                } else {
                    toast("این ویدئو از حالت «دیده‌شده» خارج شد.");
                }

                router.refresh();
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "خطا در ثبت پیشرفت");
            }
        });
    };

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
                <Link
                    href={`/courses/${courseId}/chapters/${prev.chapterId}?lesson=${prev.lessonId}`}
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                    <HugeiconsIcon icon={ArrowRight01Icon} />
                    ویدئوی قبلی
                </Link>
            ) : (
                <Button variant="outline" size="lg" disabled>
                    <HugeiconsIcon icon={ArrowRight01Icon} />
                    ویدئوی قبلی
                </Button>
            )}

            <Button
                variant="outline"
                size="lg"
                disabled={locked || isPending}
                onClick={handleToggleCompleted}
                className={cn(
                    completed &&
                        "border-teal-500 bg-teal-500/10 text-teal-600 hover:bg-teal-500/20 hover:text-teal-700 dark:border-teal-400/40 dark:bg-teal-400/10 dark:text-teal-300"
                )}
            >
                {completed ? (
                    <>
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} />
                        کامل دیده شد
                    </>
                ) : (
                    <>
                        <HugeiconsIcon icon={EyeIcon} />
                        ویدئو را کامل دیدم
                    </>
                )}
            </Button>

            {next ? (
                <Link
                    href={`/courses/${courseId}/chapters/${next.chapterId}?lesson=${next.lessonId}`}
                    className={buttonVariants({ variant: "default", size: "lg" })}
                >
                    ویدئوی بعدی
                    <HugeiconsIcon icon={ArrowLeft01Icon} />
                </Link>
            ) : (
                <Button variant="default" size="lg" disabled className="dark:bg-primary/10">
                    ویدئوی بعدی
                    <HugeiconsIcon icon={ArrowLeft01Icon} />
                </Button>
            )}
        </div>
    );
}

export default ChapterActions;
