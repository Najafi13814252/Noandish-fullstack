"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

import { HeartIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";
import { toggleCourseWishlist } from "@/actions/wishlist";

type WishlistButtonProps = {
    courseId: string;
    /** وضعیت اولیه از سرور: آیا دوره در علاقه‌مندی‌های کاربر هست یا نه */
    isWishlisted: boolean;
    className?: string;
};

function WishlistButton({ courseId, isWishlisted, className }: WishlistButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            try {
                const nextWishlisted = await toggleCourseWishlist(courseId);

                if (nextWishlisted) {
                    toast.success("دوره به علاقه‌مندی‌ها اضافه شد.");
                } else {
                    toast("دوره از علاقه‌مندی‌ها حذف شد.");
                }

                router.refresh();
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "خطا در ذخیره علاقه‌مندی");
            }
        });
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={isPending}
            aria-label={isWishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
            aria-pressed={isWishlisted}
            className={cn(
                "text-gray-300 transition-all duration-200 cursor-pointer hover:scale-125 hover:text-red-500 disabled:opacity-50",
                isWishlisted && "text-red-500 fill-red-500 hover:text-red-400",
                className
            )}
        >
            <HugeiconsIcon icon={HeartIcon} className="size-5" />
        </button>
    );
}

export default WishlistButton;
