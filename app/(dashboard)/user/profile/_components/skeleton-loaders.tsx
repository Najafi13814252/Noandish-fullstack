import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// اسکلت سایدبار (دسکتاپ + موبایل)
export function SidebarSkeleton() {
    return (
        <>
            {/* موبایل */}
            <div className="flex flex-col gap-4 lg:hidden">
                <Card className="flex items-center gap-3 p-4">
                    <Skeleton className="size-14 shrink-0 rounded-full" />

                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48 max-w-full" />
                    </div>
                </Card>

                <div className="flex gap-2 overflow-hidden">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-9 w-28 shrink-0 rounded-full" />
                    ))}
                </div>
            </div>

            {/* دسکتاپ */}
            <aside className="hidden w-72 shrink-0 flex-col gap-5 lg:flex">
                <Card className="flex flex-col items-center gap-3 p-5">
                    <Skeleton className="size-20 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-44 max-w-full" />
                </Card>

                <div className="flex flex-col gap-1.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-11 w-full rounded-xl" />
                    ))}
                </div>
            </aside>
        </>
    );
}

// اسکلت هدر صفحه (عنوان + توضیح)
export function PageHeaderSkeleton() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-7 w-44" />
            <Skeleton className="h-4 w-72 max-w-full" />
        </div>
    );
}

// اسکلت گرید کارت دوره‌ها (علاقه‌مندی‌ها)
export function CourseCardsSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index} className="space-y-3 p-3">
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />

                    <div className="flex justify-between gap-2">
                        <Skeleton className="h-4 w-14" />
                        <Skeleton className="h-4 w-14" />
                        <Skeleton className="h-4 w-14" />
                    </div>

                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/3" />
                </Card>
            ))}
        </div>
    );
}

// اسکلت کارت دوره‌های خریداری‌شده (با نوار پیشرفت)
export function ProgressCardsSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index} className="space-y-3 p-0">
                    <Skeleton className="h-36 w-full rounded-b-none" />
                    <div className="space-y-3 px-4 pb-4">
                        <Skeleton className="h-5 w-2/3" />

                        <div className="flex items-center justify-between">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-8" />
                        </div>

                        <Skeleton className="h-2.5 w-full rounded-full" />
                        <Skeleton className="h-10 w-full rounded-4xl" />
                    </div>
                </Card>
            ))}
        </div>
    );
}

// اسکلت فرم تنظیمات
export function SettingsSkeleton() {
    return (
        <div className="space-y-5">
            {Array.from({ length: 2 }).map((_, cardIndex) => (
                <Card key={cardIndex} className="space-y-4 p-5">
                    <Skeleton className="h-5 w-28" />

                    <div className="grid gap-4 sm:grid-cols-2">
                        {Array.from({ length: cardIndex === 0 ? 3 : 2 }).map((_, index) => (
                            <div
                                key={index}
                                className={index === 2 ? "space-y-2 sm:col-span-2" : "space-y-2"}
                            >
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-9 w-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                </Card>
            ))}

            <Skeleton className="h-10 w-36 rounded-4xl" />
        </div>
    );
}

// اسکلت صفحه آمار خرید (کارت‌های خلاصه + جدول)
export function StatsSkeleton() {
    return (
        <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="flex items-center gap-3 p-4">
                        <Skeleton className="size-11 shrink-0 rounded-xl" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="space-y-3 p-4">
                <Skeleton className="h-6 w-40" />

                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full" />
                ))}
            </Card>
        </div>
    );
}
