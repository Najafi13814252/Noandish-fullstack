import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ArrowLeft02Icon, ShoppingBag03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 text-center lg:py-24">
      <div className="flex size-28 items-center justify-center rounded-full bg-teal-50 dark:bg-gray-800">
        <HugeiconsIcon icon={ShoppingBag03Icon} className="size-14 text-teal-500" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-heading text-primary md:text-3xl dark:text-slate-200">
          سبد خرید شما خالی است
        </h2>
        <p className="mx-auto max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
          هنوز دوره‌ای به سبد خرید اضافه نکرده‌اید. از بین دوره‌های متنوع نواندیش انتخاب کنید.
        </p>
      </div>

      <Link href="/">
        <Button size="lg" className="dark:bg-primary/10">
          مشاهده دوره‌ها
          <HugeiconsIcon icon={ArrowLeft02Icon} className="size-5" />
        </Button>
      </Link>
    </div>
  );
}

export default EmptyCart;
