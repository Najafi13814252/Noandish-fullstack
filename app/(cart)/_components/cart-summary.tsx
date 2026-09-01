"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import {
  ArrowLeft02Icon,
  Cancel01Icon,
  Invoice,
  Shield01Icon,
  Ticket02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

const DISCOUNT_CODES: Record<string, number> = {
  noandish20: 20,
  off10: 10,
};

const formatPrice = (value: number) => value.toLocaleString("fa-IR");

type SummaryRowProps = {
  label: string;
  className?: string;
  children: React.ReactNode;
};

function SummaryRow({ label, className, children }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className={cn("text-sm font-medium text-gray-800 dark:text-white", className)}>{children}</span>
    </div>
  );
}

type CartSummaryProps = {
  totalOriginal: number;
  totalDiscount: number;
  payable: number;
};

function CartSummary({ totalOriginal, totalDiscount, payable }: CartSummaryProps) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; percent: number } | null>(null);

  const couponDiscount = applied ? Math.round((payable * applied.percent) / 100) : 0;
  const finalPayable = payable - couponDiscount;

  const handleApply = () => {
    const normalized = code.trim().toLowerCase();
    if (!normalized) return;

    const percent = DISCOUNT_CODES[normalized];
    if (!percent) {
      toast.error("کد تخفیف معتبر نیست");
      return;
    }

    setApplied({ code: normalized.toUpperCase(), percent });
    setCode("");
    toast.success(`کد تخفیف ${percent.toLocaleString("fa-IR")}٪ اعمال شد`);
  };

  const handleCheckout = () => {
    toast.success("به زودی فرآیند پرداخت فعال می‌شود!");
  };

  return (
    <Card className="gap-5 border border-teal-200 bg-white p-5 shadow-md shadow-teal-200 lg:sticky lg:top-24 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
      {/* عنوان */}
      <p className="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-white">
        <HugeiconsIcon icon={Invoice} className="size-5 text-teal-500" />
        خلاصه سفارش
      </p>

      {/* جمع قیمت‌ها */}
      <div className="flex flex-col gap-3">
        <SummaryRow label="جمع کل دوره‌ها">
          {formatPrice(totalOriginal)} <span className="text-xs text-gray-400">تومان</span>
        </SummaryRow>

        {totalDiscount > 0 && (
          <SummaryRow label="سود شما از خرید" className="text-green-500">
            {formatPrice(totalDiscount)} <span className="text-xs">تومان</span>
          </SummaryRow>
        )}
      </div>

      {/* کد تخفیف */}
      {applied ? (
        <div className="flex items-center justify-between rounded-3xl border border-dashed border-teal-500 bg-teal-50 px-4 py-2.5 dark:bg-teal-500/10">
          <span className="flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400">
            <HugeiconsIcon icon={Ticket02Icon} className="size-4" />
            {applied.code} ({applied.percent.toLocaleString("fa-IR")}٪)
          </span>

          <button
            className="text-gray-400 transition-colors hover:text-red-500"
            onClick={() => {
              setApplied(null);
              toast("کد تخفیف حذف شد");
            }}
            aria-label="حذف کد تخفیف"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleApply()}
            placeholder="کد تخفیف دارید؟"
            className="flex-1"
            dir="ltr"
          />
          <Button variant="outline" onClick={handleApply}>
            اعمال
          </Button>
        </div>
      )}

      <Separator className="bg-gray-200 dark:bg-gray-700" />

      {couponDiscount > 0 && (
        <SummaryRow label="تخفیف کد" className="text-green-500">
          {formatPrice(couponDiscount)}- <span className="text-xs">تومان</span>
        </SummaryRow>
      )}

      {/* مبلغ نهایی */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">قابل پرداخت</span>
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          {formatPrice(finalPayable)} <span className="text-xs font-normal text-gray-400">تومان</span>
        </span>
      </div>

      <Button size="lg" className="w-full dark:bg-primary/10" onClick={handleCheckout}>
        ادامه فرآیند خرید
        <HugeiconsIcon icon={ArrowLeft02Icon} className="size-5" />
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <HugeiconsIcon icon={Shield01Icon} className="size-4" />
        پرداخت امن از طریق درگاه بانکی
      </p>
    </Card>
  );
}

export default CartSummary;
