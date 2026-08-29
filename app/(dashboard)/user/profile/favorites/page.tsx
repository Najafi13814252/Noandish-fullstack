import CourseCard from "@/components/custom/course-card";
import { favoriteCourses } from "@/fake-data/user-dashboard";

import PageHeader from "../_components/page-header";

export default function FavoritesPage() {
    return (
        <section className="space-y-5">
            <PageHeader
                title="دوره‌های مورد علاقه"
                description="دوره‌هایی که به لیست علاقه‌مندی‌های خود اضافه کرده‌اید"
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {favoriteCourses.map(course => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>
        </section>
    );
}
