import { getPurchaseStats } from "@/actions/payment";

import PageHeader from "../_components/page-header";
import PurchaseStats from "../_components/purchase-stats";

export default async function StatsPage() {
    const stats = await getPurchaseStats();

    return (
        <section className="space-y-5">
            <PageHeader
                title="آمار خرید"
                description="خلاصه تراکنش‌ها و تاریخچه خریدهای شما"
            />

            <PurchaseStats stats={stats} />
        </section>
    );
}
