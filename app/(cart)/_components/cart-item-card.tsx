"use client";

import Image from "next/image";
import Link from "next/link";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { BookOpen, Clock, Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { removeCourseFromCart } from "@/actions/cart";
import { Course, Teacher } from "@/generated/prisma/client";

type CartItemCardProps = {
  course: Course & { teacher: Teacher };
};

function CartItemCard({ course }: CartItemCardProps) {
  const finalPrice = course.price - (course.price * course.discount) / 100;
  const isFree = course.discount === 100;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      try {
        await removeCourseFromCart(course.id);
        toast.success(`«${course.title}» از سبد خرید حذف شد`);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "خطا در حذف از سبد خرید");
      }
    });
  };

  return (
    <Card className="flex-row items-center gap-3 border border-teal-200 bg-white p-3 shadow-md shadow-teal-200 sm:gap-4 sm:p-4 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
      {/* تصویر دوره */}
      <Link href={`/courses/${course.id}`} className="shrink-0">
        <Image
          src={course.imageUrl}
          width={200}
          height={125}
          className="h-16 w-24 rounded-xl object-cover sm:h-24 sm:w-36"
          alt={course.title}
        />
      </Link>

      {/* مشخصات دوره */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Link
          href={`/courses/${course.id}`}
          className="line-clamp-1 text-sm font-bold text-gray-800 transition-colors hover:text-teal-500 sm:text-base dark:text-white"
        >
          {course.title}
        </Link>

        <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">مدرس: {course.teacher.name}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-400 sm:text-xs">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <HugeiconsIcon icon={BookOpen} className="size-3.5 text-sky-500 sm:size-4" />
            {course.lesson.toLocaleString("fa-IR")} درس
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <HugeiconsIcon icon={Clock} className="size-3.5 text-pink-500 sm:size-4" />
            {course.duration.toLocaleString("fa-IR")} ساعت
          </span>
        </div>
      </div>

      {/* قیمت و حذف */}
      <div className="flex shrink-0 flex-col items-end justify-between gap-2 self-stretch">
        <div className="flex flex-col items-end gap-1">
          {isFree ? (
            <p className="text-lg font-heading text-teal-500 sm:text-2xl dark:text-white">رایگان!</p>
          ) : (
            <>
              {course.discount > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-medium text-white sm:text-xs">
                    {course.discount.toLocaleString("fa-IR")}٪
                  </span>
                  <span className="text-[10px] text-gray-400 line-through sm:text-xs">
                    {course.price.toLocaleString("fa-IR")}
                  </span>
                </div>
              )}

              <p className="text-sm font-bold text-gray-800 sm:text-lg dark:text-white">
                {finalPrice.toLocaleString("fa-IR")}{" "}
                <span className="text-[10px] font-normal text-gray-400 sm:text-xs">تومان</span>
              </p>
            </>
          )}
        </div>

        {/* حذف دوره با تایید کاربر */}
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                aria-label={`حذف دوره ${course.title} از سبد خرید`}
              />
            }
          >
            <HugeiconsIcon icon={Delete02Icon} className="size-5!" />
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-red-50 text-red-500 dark:bg-red-500/10">
                <HugeiconsIcon icon={Delete02Icon} />
              </AlertDialogMedia>
              <AlertDialogTitle>حذف دوره</AlertDialogTitle>
              <AlertDialogDescription>
                آیا از حذف «{course.title}» از سبد خرید مطمئن هستید؟ این عمل قابل بازگشت نیست.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>انصراف</AlertDialogCancel>
              <AlertDialogAction variant="destructive" disabled={isPending} onClick={handleRemove}>
                <HugeiconsIcon icon={Delete02Icon} />
                حذف دوره
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}

export default CartItemCard;
