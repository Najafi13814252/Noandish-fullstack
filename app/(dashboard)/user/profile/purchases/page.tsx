import { getMyCourses } from "@/actions/user-progress";

import PageHeader from "../_components/page-header";
import PurchaseCourseCard from "../_components/purchase-course-card";

export default async function PurchasesPage() {
    const myCourses = await getMyCourses();

    return (
        <section className="space-y-5">
            <PageHeader
                title="دوره‌های من"
                description="دوره‌هایی که خریداری کرده‌اید و پیشرفت شما در هر کدام"
            />

            {myCourses.length === 0 ? (
                <p className="rounded-3xl border border-dashed border-teal-200 bg-teal-50/50 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
                    هنوز دوره‌ای شروع نکرده‌اید. با تماشای اولین جلسه، دوره این‌جا نمایش داده می‌شود.
                </p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {myCourses.map(({ course, progress, totalLessons, completedLessons }) => (
                        <PurchaseCourseCard
                            key={course.id}
                            course={course}
                            progress={progress}
                            totalLessons={totalLessons}
                            completedLessons={completedLessons}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
