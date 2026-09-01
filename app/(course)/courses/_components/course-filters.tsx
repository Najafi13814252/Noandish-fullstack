"use client"

import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

import PriceRangeSlider from "./price-range-slider"
import { pushUpdatedSearchParams } from "./update-search-params"
import {
    countActiveFilters,
    RATING_RANGES,
    type CourseFilters as CourseFiltersType,
    type PriceBounds,
} from "@/lib/course-filters"

type CourseFiltersProps = {
    filters: CourseFiltersType
    bounds: PriceBounds
}

const TYPE_OPTIONS = [
    { value: "all", label: "همه" },
    { value: "free", label: "رایگان" },
    { value: "paid", label: "نقدی" },
] as const

function CourseFilters({ filters, bounds }: CourseFiltersProps) {
    const router = useRouter()
    const pathname = usePathname()

    const update = (mutate: (params: URLSearchParams) => void) =>
        pushUpdatedSearchParams(pathname, router.push, mutate)

    const activeCount = countActiveFilters(filters)

    return (
        <Card className="border-teal-200 bg-white shadow-md shadow-teal-200 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
            <div className="flex flex-col gap-6 p-5">
                {/* نوع دوره */}
                <section className="flex flex-col gap-3">
                    <h3 className="text-base font-bold text-primary dark:text-white">نوع دوره</h3>

                    <RadioGroup
                        value={filters.type ?? "all"}
                        onValueChange={value =>
                            update(params => {
                                if (value === "all") {
                                    params.delete("type")
                                } else {
                                    params.set("type", value as string)
                                }
                            })
                        }
                    >
                        {TYPE_OPTIONS.map(option => (
                            <label
                                key={option.value}
                                htmlFor={`course-type-${option.value}`}
                                className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                <RadioGroupItem id={`course-type-${option.value}`} value={option.value} />
                                {option.label}
                            </label>
                        ))}
                    </RadioGroup>
                </section>

                <Separator />

                {/* بازهٔ قیمتی */}
                <section className="flex flex-col gap-3">
                    <h3 className="text-base font-bold text-primary dark:text-white">بازهٔ قیمتی</h3>

                    <PriceRangeSlider
                        key={`${filters.minPrice ?? bounds.min}-${filters.maxPrice ?? bounds.max}`}
                        bounds={bounds}
                        valueMin={filters.minPrice ?? bounds.min}
                        valueMax={filters.maxPrice ?? bounds.max}
                        onCommit={(min, max) =>
                            update(params => {
                                if (min <= bounds.min) {
                                    params.delete("min")
                                } else {
                                    params.set("min", String(min))
                                }

                                if (max >= bounds.max) {
                                    params.delete("max")
                                } else {
                                    params.set("max", String(max))
                                }
                            })
                        }
                    />

                    <p className="text-xs text-gray-400 dark:text-gray-500">قیمت بعد از تخفیف، به تومان</p>
                </section>

                <Separator />

                {/* امتیاز دوره */}
                <section className="flex flex-col gap-3">
                    <h3 className="text-base font-bold text-primary dark:text-white">امتیاز دوره</h3>

                    <div className="flex flex-col gap-2.5">
                        {RATING_RANGES.map(range => {
                            const checked = filters.ratings.includes(range.key)

                            return (
                                <label
                                    key={range.key}
                                    htmlFor={`course-rating-${range.key}`}
                                    className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    <Checkbox
                                        id={`course-rating-${range.key}`}
                                        checked={checked}
                                        onCheckedChange={() =>
                                            update(params => {
                                                const next = checked
                                                    ? filters.ratings.filter(key => key !== range.key)
                                                    : [...filters.ratings, range.key]

                                                params.delete("rating")
                                                next.forEach(key => params.append("rating", key))
                                            })
                                        }
                                    />
                                    {range.label}
                                </label>
                            )
                        })}
                    </div>
                </section>

                {activeCount > 0 && (
                    <>
                        <Separator />

                        <Button
                            variant="outline"
                            className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:hover:bg-red-950"
                            onClick={() =>
                                update(params => {
                                    params.delete("type")
                                    params.delete("min")
                                    params.delete("max")
                                    params.delete("rating")
                                })
                            }
                        >
                            حذف همهٔ فیلترها
                        </Button>
                    </>
                )}
            </div>
        </Card>
    )
}

export default CourseFilters
