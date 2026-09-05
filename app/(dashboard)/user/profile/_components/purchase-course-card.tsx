import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Course } from "@/generated/prisma/client";

type PurchaseCourseCardProps = {
    course: Course;
    progress: number;
    totalLessons: number;
    completedLessons: number;
};

function PurchaseCourseCard({ course, progress, totalLessons, completedLessons }: PurchaseCourseCardProps) {
    const isCompleted = progress === 100;

    return (
        <Card className="flex flex-col gap-4 overflow-hidden p-0">
            {/* عکس دوره */}
            <Link href={`/courses/${course.id}`} className="relative block h-36 w-full">
                <Image
                    src={course.imageUrl || "/images/img-1.webp"}
                    alt={course.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                />
                {isCompleted && (
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                        تکمیل شده
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
                {/* عنوان دوره */}
                <Link href={`/courses/${course.id}`}>
                    <h3 className="font-bold text-gray-800 transition-colors hover:text-primary dark:text-white">
                        {course.title}
                    </h3>
                </Link>

                {/* نوار پیشرفت */}
                <div className="mt-auto space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-300">
                            {completedLessons.toLocaleString("fa-IR")} از {totalLessons.toLocaleString("fa-IR")} جلسه
                        </span>
                        <span className="font-medium text-primary">
                            {progress.toLocaleString("fa-IR")}٪
                        </span>
                    </div>

                    <Progress value={progress} className="h-2 [&>div]:h-2 [&>div]:my-auto [&>div]:rounded-full"/>
                </div>

                {/* دکمه ادامه */}
                <Button render={<Link href={`/courses/${course.id}`} />} className="mt-1 w-full dark:bg-primary/10">
                    <HugeiconsIcon icon={PlayCircleIcon} className="size-5" />
                    {isCompleted ? "مشاهده دوره" : "ادامه دوره"}
                </Button>
            </div>
        </Card>
    );
}

export default PurchaseCourseCard;
