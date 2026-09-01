import { Skeleton } from "@/components/ui/skeleton"

/** اسکلتون گرید دوره‌ها؛ هنگام تغییر فیلتر داخل ساسپنس نمایش داده می‌شود */
function CoursesSkeleton() {
    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <Skeleton className="h-4 w-24" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-700"
                    >
                        <Skeleton className="h-40 w-full rounded-xl" />
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="mt-4 h-8 w-1/2 self-end" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CoursesSkeleton
