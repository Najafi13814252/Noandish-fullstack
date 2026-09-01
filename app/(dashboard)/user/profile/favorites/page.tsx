import CourseCard from "@/components/custom/course-card";
import { getWishlistCourses } from "@/data/wishlist";

import PageHeader from "../_components/page-header";

export default async function FavoritesPage() {
    const courses = await getWishlistCourses();

    return (
        <section className="space-y-5">
            <PageHeader
                title="دوره‌های مورد علاقه"
                description="دوره‌هایی که به لیست علاقه‌مندی‌های خود اضافه کرده‌اید"
            />

            {courses.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    هنوز دوره‌ای به علاقه‌مندی‌ها اضافه نکرده‌اید.
                </p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {courses.map(course => (
                        <CourseCard key={course.id} {...course} isWishlisted />
                    ))}
                </div>
            )}
        </section>
    );
}
