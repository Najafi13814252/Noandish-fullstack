'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Show } from "@clerk/nextjs";
import { BookOpen01Icon, Home01Icon, ShoppingBag03Icon, User } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

import LoginDialog from "./auth/login-dialog";
import Categories from "./navbar/categories";

function MobileFooter() {
    const pathname = usePathname();

    const tabClass = (active: boolean) =>
        cn(
            "flex flex-col items-center gap-1 text-xs font-medium transition-colors",
            active ? "text-primary" : "text-gray-500 hover:text-primary"
        );

    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-gray-200 bg-background px-2 pt-2 pb-[max(env(safe-area-inset-bottom),_0.5rem)] md:hidden dark:border-gray-800">
            <Link href="/" className={tabClass(pathname === "/")}>
                <HugeiconsIcon icon={Home01Icon} className="size-6" />
                خانه
            </Link>

            <Link href="/courses" className={tabClass(pathname.startsWith("/courses"))}>
                <HugeiconsIcon icon={BookOpen01Icon} className="size-6" />
                دوره‌ها
            </Link>

            <Categories variant="tab" />

            <Link href="/cart" className={tabClass(pathname.startsWith("/cart"))}>
                <HugeiconsIcon icon={ShoppingBag03Icon} className="size-6" />
                سبد خرید
            </Link>

            <Show when="signed-in">
                <Link href="/user/profile/favorites" className={tabClass(pathname.startsWith("/user/profile/favorites"))}>
                    <HugeiconsIcon icon={User} className="size-6" />
                    پروفایل
                </Link>
            </Show>

            <Show when="signed-out">
                <LoginDialog variant="tab" />
            </Show>
        </nav>
    );
}

export default MobileFooter;
