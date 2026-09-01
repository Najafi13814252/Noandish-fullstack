import Link from "next/link"

import { HugeiconsIcon } from "@hugeicons/react"
import { SearchRemoveIcon } from "@hugeicons/core-free-icons"

import CourseCard from "@/components/custom/course-card"
import { Button } from "@/components/ui/button"

import { getFilteredCourses } from "@/data/courses"
import type { CourseFilters } from "@/lib/course-filters"

type CourseGridProps = {
    filters: CourseFilters
    /** شناسهٔ دوره‌های علاقه‌مندی کاربر برای قلب کارت‌ها */
    wishlistedCourseIds: string[]
}

async function CourseGrid({ filters, wishlistedCourseIds }: CourseGridProps) {
    const courses = await getFilteredCourses(filters)

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 py-20 text-center dark:border-gray-700">
                <HugeiconsIcon icon={SearchRemoveIcon} className="size-16 text-gray-300 dark:text-gray-600" strokeWidth={1.5} />

                <p className="text-lg font-bold text-gray-800 dark:text-white">دوره‌ای با این فیلترها پیدا نشد</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">فیلترها را تغییر دهید یا همه را حذف کنید</p>

                <Link href="/courses" className="mt-2">
                    <Button variant="outline" className="border-teal-200 dark:border-gray-700">
                        حذف همهٔ فیلترها
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    {...course}
                    isWishlisted={wishlistedCourseIds.includes(course.id)}
                    teacherName={course.teacher.name}
                    teacherAvatar={course.teacher.avatar}
                />
            ))}
        </div>
    )
}

export default CourseGrid
