import { PageHeaderSkeleton, StatsSkeleton } from "../_components/skeleton-loaders";

export default function StatsLoading() {
    return (
        <div className="space-y-5">
            <PageHeaderSkeleton />
            <StatsSkeleton />
        </div>
    );
}
