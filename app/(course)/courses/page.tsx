import { Suspense } from "react"

import type { Metadata } from "next"

import CourseFilters from "./_components/course-filters"
import CourseGrid from "./_components/course-grid"
import CoursesSkeleton from "./_components/courses-skeleton"
import CoursesToolbar from "./_components/courses-toolbar"

import { countFilteredCourses, getPriceBounds } from "@/data/courses"
import { getWishlistedCourseIds } from "@/data/wishlist"
import { parseCourseFilters, serializeFilters } from "@/lib/course-filters"

export const metadata: Metadata = {
    title: "دوره‌ها | نواندیش",
    description: "فهرست دوره‌های تخصصی نواندیش با فیلتر بر اساس قیمت، نوع و امتیاز",
}

type CoursesPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
    const filters = parseCourseFilters(await searchParams)

    const [bounds, wishlistedCourseIds, courseCount] = await Promise.all([
        getPriceBounds(),
        getWishlistedCourseIds(),
        countFilteredCourses(filters),
    ])

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10">
            {/* عنوان صفحه */}
            <header>
                <h1 className="text-2xl font-heading text-primary md:text-4xl dark:text-white">همهٔ دوره‌ها</h1>
                <p className="mt-2 text-sm text-gray-500 md:text-base dark:text-gray-400">
                    دوره‌های تخصصی نواندیش را بر اساس قیمت، نوع و امتیاز فیلتر کنید
                </p>
            </header>

            <div className="mt-6 flex items-start gap-8 md:mt-8">
                {/* سایدبار فیلترها (فقط دسکتاپ) */}
                <aside className="sticky top-24 hidden w-80 shrink-0 lg:block">
                    <CourseFilters filters={filters} bounds={bounds} />
                </aside>

                {/* لیست دوره‌ها */}
                <div className="min-w-0 flex-1">
                    {/* نوار مرتب‌سازی با تعداد دوره‌ها در انتهای آن */}
                    <CoursesToolbar filters={filters} bounds={bounds} count={courseCount} />

                    <div className="mt-4 md:mt-6">
                        <Suspense key={serializeFilters(filters)} fallback={<CoursesSkeleton />}>
                            <CourseGrid filters={filters} wishlistedCourseIds={wishlistedCourseIds} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}
