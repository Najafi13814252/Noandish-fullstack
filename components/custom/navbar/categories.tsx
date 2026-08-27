"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft02Icon, ArrowRight02Icon, MenuSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { categories } from "@/fake-data/categories";
import { cn } from "@/lib/utils";

type CategoriesProps = {
    variant?: "navbar" | "tab";
};

function Categories({ variant = "navbar" }: CategoriesProps) {
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [direction, setDirection] = useState<"forward" | "back">("forward");
    const [activeIndex, setActiveIndex] = useState(0);

    const activeCategory = categories.find(category => category.id === activeId) ?? null;

    const handleOpenChange = (next: boolean) => {
        setOpen(next);

        // با بستن sheet به مرحله اول برگرد
        if (!next) {
            setActiveId(null);
        }
    };

    const openCategory = (id: number) => {
        setDirection("forward");
        setActiveId(id);
    };

    const closeCategory = () => {
        setDirection("back");
        setActiveId(null);
    };

    const triggerClass = variant === "tab"
        ? "flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-primary transition-colors"
        : "flex items-center gap-x-2 text-primary text-lg";

    // انیمیشن ورود آیتم‌ها در هر مرحله: جلو از چپ، برگشت از راست
    const stageAnimation = cn(
        "animate-in fade-in ease-out fill-mode-both animation-duration-300",
        direction === "forward" ? "slide-in-from-left-4" : "slide-in-from-right-4"
    );

    const staggerStyle = (index: number): CSSProperties => ({
        "--tw-animation-delay": `${index * 60}ms`,
    } as CSSProperties);

    return (
        <>
            {/* دسته‌بندی دسکتاپ */}
            {variant === "navbar" && (
                <div className="hidden md:block">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="p-0 hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent">
                                    <div className="flex items-center gap-x-2 text-primary text-lg">
                                        <HugeiconsIcon icon={MenuSquareIcon} className="size-5" />
                                        <span className="font-normal">دسته‌بندی‌ها</span>
                                    </div>
                                </NavigationMenuTrigger>

                                <NavigationMenuContent>
                                    <div className="flex w-170">
                                        {/* منوهای اصلی */}
                                        <ul className="grid w-[45%] pl-2">
                                            <li >
                                                {categories.map((category, index) => (
                                                    <NavigationMenuLink key={category.id} onMouseEnter={() => setActiveIndex(index)} className={cn(
                                                        "group hover:bg-primary/10 group-hover:shadow-none",
                                                        activeIndex === index ? "bg-primary/10 text-primary " : ""
                                                    )} render={
                                                        <Link href="#" className="flex-row items-center gap-2">
                                                            <div className="bg-gray-50 shadow-inner rounded-full p-2 dark:bg-gray-50/10">
                                                                <HugeiconsIcon icon={category.icon_name} className="size-5 text-primary" />
                                                            </div>
                                                            <p className="font-medium">{category.title}</p>
                                                        </Link>
                                                    } />
                                                ))}

                                            </li>
                                        </ul>
                                        {/* زیر منوها */}
                                        <div className="flex flex-col gap-9 pt-5 pr-4 py-2 w-[55%] bg-gray-100 rounded-2xl dark:bg-slate-800">
                                            {categories[activeIndex].items.map((item, index) => (
                                                <div key={index} className="text-muted-foreground text-sm hover:text-primary duration-100 cursor-pointer">
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            )}

            {/* دسته‌بندی موبایل */}
            <div className={cn(variant === "navbar" && "md:hidden")}>
                <Sheet open={open} onOpenChange={handleOpenChange}>
                    <SheetTrigger
                        render={
                            <button className={cn("cursor-pointer", triggerClass)}>
                                <HugeiconsIcon icon={MenuSquareIcon} className={variant === "tab" ? "size-6" : "size-5"} />
                                <span className={cn("font-normal", variant === "navbar" && "hidden sm:inline")}>
                                    دسته‌بندی‌ها
                                </span>
                            </button>
                        }
                    />

                    <SheetContent
                        side="bottom"
                        className="h-[85dvh] w-full rounded-t-2xl p-0 md:mx-auto md:mb-6 md:max-w-md md:rounded-2xl"
                    >
                        <SheetTitle className="sr-only">دسته‌بندی‌ها</SheetTitle>

                        {/* دستگیره */}
                        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-border" />

                        {/* هدر sheet */}
                        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
                            {activeCategory ? (
                                <button
                                    className="flex animate-in fade-in cursor-pointer items-center gap-1 text-sm font-medium text-primary animation-duration-200"
                                    onClick={closeCategory}
                                >
                                    <HugeiconsIcon icon={ArrowRight02Icon} className="size-5" />
                                    بازگشت
                                </button>
                            ) : (
                                <span className="animate-in fade-in text-lg font-heading text-primary animation-duration-200 dark:text-slate-200">
                                    دسته‌بندی‌ها
                                </span>
                            )}
                        </div>

                        {/* بدنه sheet */}
                        <div className="flex-1 overflow-y-auto px-4 pb-6">
                            {activeCategory ? (
                                /* مرحله دوم: آیتم‌های دسته انتخاب‌شده */
                                <div key={`category-${activeCategory.id}`}>
                                    <div
                                        className={cn("flex items-center gap-3 px-2 py-3", stageAnimation)}
                                        style={staggerStyle(0)}
                                    >
                                        <span className="flex items-center justify-center rounded-full bg-secondary p-2 text-primary dark:bg-gray-700 dark:text-slate-200">
                                            <HugeiconsIcon icon={activeCategory.icon_name} className="size-5" />
                                        </span>
                                        <p className="text-base font-bold text-gray-800 dark:text-white">
                                            {activeCategory.title}
                                        </p>
                                    </div>

                                    <ul className="space-y-1">
                                        {activeCategory.items.map((item, index) => (
                                            <li
                                                key={index}
                                                className={stageAnimation}
                                                style={staggerStyle(index + 1)}
                                            >
                                                <Link
                                                    href="#"
                                                    onClick={() => setOpen(false)}
                                                    className="block rounded-xl px-3 py-3 text-sm text-gray-600 transition-colors hover:bg-muted hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                                                >
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                /* مرحله اول: لیست دسته‌ها */
                                <ul key="list" className="space-y-1">
                                    {categories.map((category, index) => (
                                        <li
                                            key={category.id}
                                            className={stageAnimation}
                                            style={staggerStyle(index)}
                                        >
                                            <button
                                                className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-3 text-start transition-colors hover:bg-muted"
                                                onClick={() => openCategory(category.id)}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <span className="flex items-center justify-center rounded-full bg-secondary p-2 text-primary dark:bg-gray-700 dark:text-slate-200">
                                                        <HugeiconsIcon icon={category.icon_name} className="size-5" />
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                                                        {category.title}
                                                    </span>
                                                </span>

                                                <HugeiconsIcon icon={ArrowLeft02Icon} className="size-5 shrink-0 text-gray-400" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}

export default Categories;
