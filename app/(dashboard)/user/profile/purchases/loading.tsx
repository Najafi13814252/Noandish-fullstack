import { PageHeaderSkeleton, ProgressCardsSkeleton } from "../_components/skeleton-loaders";

export default function PurchasesLoading() {
    return (
        <div className="space-y-5">
            <PageHeaderSkeleton />
            <ProgressCardsSkeleton />
        </div>
    );
}
