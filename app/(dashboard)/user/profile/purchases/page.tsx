import { purchasedCourses } from "@/fake-data/user-dashboard";

import PageHeader from "../_components/page-header";
import PurchaseCourseCard from "../_components/purchase-course-card";

export default function PurchasesPage() {
    return (
        <section className="space-y-5">
            <PageHeader
                title="دوره‌های من"
                description="دوره‌هایی که خریداری کرده‌اید و پیشرفت شما در هر کدام"
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {purchasedCourses.map(purchase => (
                    <PurchaseCourseCard key={purchase.id} purchase={purchase} />
                ))}
            </div>
        </section>
    );
}
