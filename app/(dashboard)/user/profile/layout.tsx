import type { Metadata } from "next";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { NO_INDEX_ROBOTS } from "@/lib/seo";

import Sidebar from "./_components/sidebar";

export const metadata: Metadata = {
    title: "پروفایل کاربری",
    description: "پروفایل کاربری، دوره‌های خریداری‌شده و تنظیمات حساب کاربری در نواندیش",
    robots: NO_INDEX_ROBOTS,
};

type ProfileLayoutProps = {
    children: React.ReactNode;
};

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
    const user = await currentUser();

    // اگر کاربر وارد نشده باشد به صفحه اصلی برمی‌گردد
    if (!user) {
        redirect("/");
    }

    const userInfo = {
        name: user.fullName ?? user.username ?? "کاربر نواندیش",
        email: user.emailAddresses[0]?.emailAddress ?? "",
        avatar: user.imageUrl,
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <Sidebar user={userInfo} />

                <main className="min-w-0 flex-1">{children}</main>
            </div>
        </div>
    );
}
