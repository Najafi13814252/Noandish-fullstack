import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cards } from "@/fake-data/courses";
import { PurchasedCourseType } from "@/fake-data/user-dashboard";

type PurchaseCourseCardProps = {
    purchase: PurchasedCourseType;
};

function PurchaseCourseCard({ purchase }: PurchaseCourseCardProps) {
    const course = cards.find(card => card.id === purchase.courseId);

    if (!course) {
        return null;
    }

    const isCompleted = purchase.progress === 100;

    return (
        <Card className="flex flex-col gap-4 overflow-hidden p-0">
            {/* عکس دوره */}
            <Link href={`/courses/${course.id}`} className="relative block h-36 w-full">
                <Image
                    src={course.src || "/images/img-1.webp"}
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
                        <span className="text-gray-500 dark:text-gray-300">پیشرفت دوره</span>
                        <span className="font-medium text-primary">
                            {purchase.progress.toLocaleString("fa-IR")}٪
                        </span>
                    </div>

                    <Progress value={purchase.progress} className="h-2.5 [&>div]:rounded-full" />
                </div>

                {/* دکمه ادامه */}
                <Button render={<Link href={`/courses/${course.id}`} />} className="mt-1 w-full">
                    <HugeiconsIcon icon={PlayCircleIcon} className="size-5" />
                    {isCompleted ? "مشاهده دوره" : "ادامه دوره"}
                </Button>
            </div>
        </Card>
    );
}

export default PurchaseCourseCard;
