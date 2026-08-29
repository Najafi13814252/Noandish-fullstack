"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useClerk } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChartUpIcon, HeartIcon, Logout01Icon, Playlist02Icon, Settings02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

export type SidebarUser = {
    name: string;
    email: string;
    avatar: string;
};

type SidebarProps = {
    user: SidebarUser;
};

const navItems = [
    { href: "/user/profile/favorites", label: "دوره‌های مورد علاقه", icon: HeartIcon },
    { href: "/user/profile/purchases", label: "دوره‌های من", icon: Playlist02Icon },
    { href: "/user/profile/settings", label: "تنظیمات", icon: Settings02Icon },
    { href: "/user/profile/stats", label: "آمار خرید", icon: ChartUpIcon },
];

function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();
    const { signOut } = useClerk();

    const isActive = (href: string) => pathname.startsWith(href);

    const handleLogout = () => {
        signOut({ redirectUrl: "/" });
    };

    return (
        <>
            {/* سایدبار موبایل: کارت کاربر + منوی افقی */}
            <div className="flex flex-col gap-4 lg:hidden">
                <Card className="flex items-center gap-3 p-4">
                    <Avatar className="size-14 shrink-0 border-2 border-secondary">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-secondary text-lg text-primary">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <p className="truncate font-bold text-gray-800 dark:text-white">{user.name}</p>
                        <p className="truncate text-sm text-muted-foreground" dir="ltr">{user.email}</p>
                    </div>
                </Card>

                <nav className="flex gap-2 overflow-x-auto pb-1">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                                isActive(item.href)
                                    ? "bg-primary text-white"
                                    : "bg-muted text-gray-600 hover:text-primary dark:text-gray-300"
                            )}
                        >
                            <HugeiconsIcon icon={item.icon} className="size-4" />
                            {item.label}
                        </Link>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20"
                    >
                        <HugeiconsIcon icon={Logout01Icon} className="size-4" />
                        خروج
                    </button>
                </nav>
            </div>

            {/* سایدبار دسکتاپ */}
            <aside className="hidden w-72 shrink-0 flex-col gap-5 lg:flex lg:sticky lg:top-24">
                {/* اطلاعات کاربر */}
                <Card className="flex flex-col items-center gap-3 p-5 text-center">
                    <Avatar className="size-20 border-4 border-secondary">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-secondary text-xl text-primary">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <p className="truncate text-lg font-bold text-gray-800 dark:text-white">{user.name}</p>
                        <p className="truncate text-sm text-muted-foreground" dir="ltr">{user.email}</p>
                    </div>
                </Card>

                {/* منوی داشبورد */}
                <nav className="flex flex-col gap-1.5">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors",
                                isActive(item.href)
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-600 hover:bg-muted hover:text-primary dark:text-gray-300"
                            )}
                        >
                            <HugeiconsIcon icon={item.icon} className="size-5" />
                            {item.label}
                        </Link>
                    ))}

                    {/* خروج از حساب */}
                    <button
                        onClick={handleLogout}
                        className="mt-2 flex cursor-pointer items-center gap-2.5 rounded-xl border-t border-border px-3.5 py-3 pt-4 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
                    >
                        <HugeiconsIcon icon={Logout01Icon} className="size-5" />
                        خروج از حساب
                    </button>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
