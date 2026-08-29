import PageHeader from "../_components/page-header";
import PurchaseStats from "../_components/purchase-stats";

export default function StatsPage() {
    return (
        <section className="space-y-5">
            <PageHeader
                title="آمار خرید"
                description="خلاصه تراکنش‌ها و تاریخچه خریدهای شما"
            />

            <PurchaseStats />
        </section>
    );
}
