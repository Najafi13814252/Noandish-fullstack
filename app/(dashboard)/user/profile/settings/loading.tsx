import { PageHeaderSkeleton, SettingsSkeleton } from "../_components/skeleton-loaders";

export default function SettingsLoading() {
    return (
        <div className="space-y-5">
            <PageHeaderSkeleton />
            <SettingsSkeleton />
        </div>
    );
}
