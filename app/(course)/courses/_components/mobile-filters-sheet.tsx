"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { FilterHorizontalIcon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import CourseFilters from "./course-filters"
import {
    countActiveFilters,
    type CourseFilters as CourseFiltersType,
    type PriceBounds,
} from "@/lib/course-filters"

type MobileFiltersSheetProps = {
    filters: CourseFiltersType
    bounds: PriceBounds
}

/** در موبایل فیلترها داخل یک شیت پایینی باز می‌شوند؛ در دسکتاپ سایدبار کناری نمایش داده می‌شود */
function MobileFiltersSheet({ filters, bounds }: MobileFiltersSheetProps) {
    const activeCount = countActiveFilters(filters)

    return (
        <Sheet>
            <SheetTrigger
                render={
                    <Button
                        variant="outline"
                        className="gap-2 border-teal-200 bg-white dark:border-gray-700 dark:bg-gray-800 lg:hidden"
                    >
                        <HugeiconsIcon icon={FilterHorizontalIcon} className="size-4" strokeWidth={2} />
                        <span className="hidden sm:inline">فیلترها</span>

                        {activeCount > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-500 px-1 text-[10px] font-bold text-white">
                                {activeCount.toLocaleString("fa-IR")}
                            </span>
                        )}
                    </Button>
                }
            />

            <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto rounded-t-3xl">
                <SheetHeader>
                    <SheetTitle>فیلتر دوره‌ها</SheetTitle>
                </SheetHeader>

                <CourseFilters filters={filters} bounds={bounds} />

                <SheetFooter>
                    <SheetClose
                        render={
                            <Button className="w-full dark:bg-primary/10">
                                مشاهدهٔ نتایج
                            </Button>
                        }
                    />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default MobileFiltersSheet
