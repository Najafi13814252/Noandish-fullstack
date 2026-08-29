import { CourseCardsSkeleton, PageHeaderSkeleton } from "../_components/skeleton-loaders";

export default function FavoritesLoading() {
    return (
        <div className="space-y-5">
            <PageHeaderSkeleton />
            <CourseCardsSkeleton />
        </div>
    );
}
