import { Card } from "../ui/card"

import { BookOpen, Clock, GraduationCapIcon, Star } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import Image from "next/image"
import Link from "next/link"
import { Course } from "@/generated/prisma/client"

import WishlistButton from "./wishlist-button"

type CourseCardProps = Course & {
    /** آیا دوره در علاقه‌مندی‌های کاربر واردشده هست (از سرور می‌آید) */
    isWishlisted?: boolean
    /** نام معلم؛ وقتی از سرور همراه رابطهٔ teacher می‌آید */
    teacherName?: string
    /** آواتار معلم؛ وقتی از سرور همراه رابطهٔ teacher می‌آید */
    teacherAvatar?: string
}

function CourseCard({ id, imageUrl, title, discount, price, rate, duration, lesson, members, isWishlisted = false, teacherName, teacherAvatar }: CourseCardProps) {
    return (
        <Card className="flex flex-col relative gap-2 border bg-white border-teal-200 shadow-md shadow-teal-200 p-3 cursor-pointer transform transition-transform duration-200 hover:scale-105 dark:bg-gray-800 dark:border-gray-700 dark:shadow-none">

            {/* عکس دوره */}
            <Link href={`/courses/${id}`}>
                <Image src={imageUrl || '/images/img-1.webp'} width={400} height={250} className="w-full h-40 object-cover rounded-xl" loading="lazy" alt="Course_Image" />
            </Link>


            <section className="flex flex-col gap-7">
                {/* عنوان دوره */}

                <div className="flex items-center justify-between">
                    <Link href={`/courses/${id}`}>
                        <p className="text-lg font-bold text-gray-800 dark:text-white">{title}</p>
                    </Link>
                    <WishlistButton courseId={id} isWishlisted={isWishlisted} />
                </div>


                {/* جزئیات دوره */}
                <div className="flex justify-between gap-2 text-gray-500 text-sm font-medium h-2">
                    <div className="flex items-center gap-1 whitespace-nowrap dark:text-gray-50">
                        <HugeiconsIcon className="text-sky-500 size-5" icon={BookOpen} />
                        <p>{lesson} درس</p>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap dark:text-gray-50">
                        <HugeiconsIcon className="text-green-500 size-5" icon={GraduationCapIcon} />
                        <p>{members} دانشجو</p>
                    </div>
                    <div className="flex items-center gap-1 dark:text-gray-50 whitespace-nowrap">
                        <HugeiconsIcon className="text-pink-500 size-5" icon={Clock} />
                        <p className="">{duration} ساعت</p>
                    </div>
                </div>
            </section>

            {/* پروفایل معلم */}
            <section className="flex justify-between mt-6 items-center">
                <div className="flex items-center gap-1.5 text-gray-500 hover:text-teal-500 duration-200">
                    <img src={teacherAvatar ?? "/images/person.webp"} alt="teacher_profile" className="rounded-full w-7 h-7 object-cover" />
                    <span className="text-sm">{teacherName ?? "علی احمدی"}</span>
                </div>

                <div className="flex gap-1">
                    <p className="text-gray-500 text-sm relative top-0.5">({rate})</p>
                    <div className="flex flex-row-reverse items-end">
                        {Array.from({ length: 5 }).map((_, index) => {
                            const fill = Math.max(0, Math.min(1, Number(rate) - index))

                            return (
                                <div key={index} className="relative" dir="ltr">
                                    <HugeiconsIcon
                                        icon={Star}
                                        className="size-4 text-gray-300 fill-gray-300"
                                    />

                                    <div
                                        className="absolute inset-0 overflow-hidden"
                                        style={{ width: `${fill * 100}%` }}
                                    >
                                        <HugeiconsIcon
                                            icon={Star}
                                            className="size-4 text-yellow-400 fill-yellow-400"
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <hr className="text-gray-200 dark:text-gray-700" />

            {/* قیمیت دوره */}
            <section className="flex justify-end items-center gap-1 dark:text-white">
                {discount !== 0 ? (
                    <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <p className="text-sm bg-red-500 text-white font-medium p-1 rounded-md">{discount}%</p>
                            <p className="line-through text-gray-500">{price.toLocaleString('fa-IR')}</p>
                        </div>
                        {discount === 100 ? (
                            <p className="text-xl font-heading text-teal-500 dark:text-white">رایگان!</p>
                        ) : (
                            <p className="text-xl font-medium">{(price - (price * discount / 100)).toLocaleString('fa-IR')} <span className="text-sm font-normal text-gray-400">تومان </span></p>
                        )}
                    </div>
                ) : (
                    <p className="text-xl font-medium">{price.toLocaleString('fa-IR')} <span className="text-sm font-normal text-gray-400">تومان </span></p>
                )}
            </section>
        </Card>
    )
}

export default CourseCard
