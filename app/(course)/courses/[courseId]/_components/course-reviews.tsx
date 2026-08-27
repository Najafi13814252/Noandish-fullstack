import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Message01Icon } from "@hugeicons/core-free-icons"

import { reviewType } from "@/fake-data/course-details"

import CourseSection from "./course-section"
import StarRating from "./star-rating"

type CourseReviewsProps = {
    reviews: reviewType[]
    rate: number
}

function CourseReviews({ reviews, rate }: CourseReviewsProps) {
    const average = reviews.length
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : rate

    return (
        <CourseSection
            icon={Message01Icon}
            title="نظرات کاربران"
            subtitle={`${reviews.length.toLocaleString('fa-IR')} دیدگاه ثبت شده`}
        >
            {/* خلاصه امتیازات */}
            <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4 dark:bg-gray-700/50">
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                    {average.toLocaleString('fa-IR', { maximumFractionDigits: 1 })}
                </p>

                <div className="flex flex-col items-start gap-1">
                    <StarRating rate={average} size="size-5" />
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                        میانگین امتیاز {reviews.length.toLocaleString('fa-IR')} دیدگاه
                    </p>
                </div>
            </div>

            <Separator className="my-5 bg-gray-200 dark:bg-gray-700" />

            {/* لیست نظرات */}
            <ul className="space-y-6">
                {reviews.map(review => (
                    <li key={review.id} className="flex gap-3">
                        <Avatar className="border border-teal-200 dark:border-gray-700">
                            <AvatarFallback className="bg-secondary text-primary dark:bg-gray-700 dark:text-slate-200">
                                {review.name[0]}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-gray-800 dark:text-white">{review.name}</p>
                                    <StarRating rate={review.rating} />
                                </div>

                                <p className="text-xs text-gray-400">{review.date}</p>
                            </div>

                            <p className="mt-2 text-justify leading-7 text-gray-600 dark:text-gray-200">
                                {review.comment}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </CourseSection>
    )
}

export default CourseReviews
