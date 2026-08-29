import { CourseCardsSkeleton, PageHeaderSkeleton, SidebarSkeleton } from "./_components/skeleton-loaders";

// اسکلت بارگذاری اولیه داشبورد پروفایل (سایدبار + محتوا)
export default function ProfileLoading() {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <SidebarSkeleton />

                <main className="min-w-0 flex-1">
                    <div className="space-y-5">
                        <PageHeaderSkeleton />
                        <CourseCardsSkeleton />
                    </div>
                </main>
            </div>
        </div>
    );
}
