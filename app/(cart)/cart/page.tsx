import type { Metadata } from "next";
import Link from "next/link";

import { ArrowLeft02Icon, ShoppingBag03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { getCartCourses } from "@/actions/cart";
import { NO_INDEX_ROBOTS } from "@/lib/seo";

import CartItemCard from "../_components/cart-item-card";
import CartSummary from "../_components/cart-summary";
import EmptyCart from "../_components/empty-cart";

// صفحهٔ شخصیِ کاربر؛ نباید در نتایج جستجو بیاید
export const metadata: Metadata = {
    title: "سبد خرید",
    robots: NO_INDEX_ROBOTS,
};

export default async function CartPage() {
  const cartCourses = await getCartCourses();

  const { totalOriginal, totalDiscount, payable } = cartCourses.reduce(
    (sum, course) => {
      const original = course.price;
      const final = course.price - (course.price * course.discount) / 100;

      return {
        totalOriginal: sum.totalOriginal + original,
        totalDiscount: sum.totalDiscount + (original - final),
        payable: sum.payable + final,
      };
    },
    { totalOriginal: 0, totalDiscount: 0, payable: 0 }
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:py-12">
      {/* سربرگ صفحه */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 lg:mb-8">
        <div className="flex items-center gap-3">
          <HugeiconsIcon icon={ShoppingBag03Icon} className="size-8 text-[#9AC1C3]" />
          <h1 className="text-2xl font-heading text-primary md:text-3xl dark:text-slate-200">سبد خرید</h1>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20">
            {cartCourses.length.toLocaleString("fa-IR")} دوره
          </span>
        </div>

        {cartCourses.length > 0 && (
          <Link
            href="/"
            className="hidden items-center gap-1 text-sm text-gray-500 transition-colors hover:text-primary sm:flex dark:text-gray-400"
          >
            ادامه خرید
            <HugeiconsIcon icon={ArrowLeft02Icon} className="size-4" />
          </Link>
        )}
      </header>

      {cartCourses.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          {/* فهرست دوره‌ها */}
          <section className="flex flex-col gap-4">
            {cartCourses.map((course) => (
              <CartItemCard key={course.id} course={course} />
            ))}
          </section>

          {/* خلاصه سفارش */}
          <CartSummary totalOriginal={totalOriginal} totalDiscount={totalDiscount} payable={payable} />
        </div>
      )}
    </div>
  );
}
