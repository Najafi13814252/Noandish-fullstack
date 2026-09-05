"use client"

import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { cn } from "@/lib/utils"

import MobileFiltersSheet from "./mobile-filters-sheet"
import { pushUpdatedSearchParams } from "./update-search-params"
import {
    SORT_OPTIONS,
    type CourseFilters,
    type CourseSort,
    type PriceBounds,
} from "@/lib/course-filters"

type CoursesToolbarProps = {
    filters: CourseFilters
    bounds: PriceBounds
    /** تعداد کل دوره‌ها بعد از اعمال فیلترها؛ در انتهای ردیف نمایش داده می‌شود */
    count: number
}

/** نوار مرتب‌سازی: گزینه‌ها به صورت ردیفی داخل یک باکس و تعداد دوره‌ها در انتهای آن */
function CoursesToolbar({ filters, bounds, count }: CoursesToolbarProps) {
    const router = useRouter()
    const pathname = usePathname()

    const setSort = (sort: CourseSort) =>
        pushUpdatedSearchParams(pathname, router.push, params => {
            if (sort === "newest") {
                params.delete("sort")
            } else {
                params.set("sort", sort)
            }
        })

    return (
        <Card className="border-teal-200 bg-white py-0 shadow-md shadow-teal-200 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 md:px-4">
                <div className="flex items-center gap-2 md:gap-3">
                    {/* در موبایل دکمهٔ فیلترها اینجاست؛ در دسکتاپ سایدبار کناری هست */}
                    <MobileFiltersSheet filters={filters} bounds={bounds} />

                    <span className="hidden text-sm text-gray-500 dark:text-gray-400 md:inline">مرتب‌سازی:</span>

                    {/* گزینه‌های مرتب‌سازی به صورت ردیفی */}
                    <div className="flex items-center gap-1 rounded-xl">
                        {SORT_OPTIONS.map(option => {
                            const active = filters.sort === option.value

                            return (
                                <Button
                                    key={option.value}
                                    size="sm"
                                    variant={active ? "default" : "ghost"}
                                    className={cn(
                                        "h-8 rounded-lg px-2.5 text-xs font-medium md:px-4 md:text-sm dark:bg-primary/10",
                                        !active && "text-gray-600 hover:text-gray-800 dark:bg-transparent dark:text-gray-300 dark:hover:text-white",
                                    )}
                                    onClick={() => setSort(option.value)}
                                >
                                    {option.label}
                                </Button>
                            )
                        })}
                    </div>
                </div>

                {/* تعداد دوره‌ها در انتهای ردیف */}
                <p className="shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {count.toLocaleString("fa-IR")} دوره
                </p>
            </div>
        </Card>
    )
}

export default CoursesToolbar
