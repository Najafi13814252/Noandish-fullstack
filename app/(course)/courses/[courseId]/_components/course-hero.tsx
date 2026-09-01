import Image from "next/image"

import { Card } from "@/components/ui/card"

import { Course } from "@/generated/prisma/client"

function CourseHero({ imageUrl, description, title }: Course) {
    return (
        <Card className="mt-6 p-0 overflow-hidden border-teal-200 bg-white shadow-md shadow-teal-200 dark:bg-gray-800 dark:border-gray-700 dark:shadow-none">
            <div className="relative">
                {/* عکس دوره به عنوان پس‌زمینه */}
                <Image
                    src={imageUrl || "/images/img-1.webp"}
                    alt={title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                />

                {/* لایه تیره و گرادیان برای خوانایی متن */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/20" />

                {/* عنوان و توضیحات در وسط */}
                <div className="relative flex flex-col items-center justify-center gap-4 px-6 py-20 text-center md:py-28">
                    <h1 className="text-3xl md:text-5xl font-heading text-white drop-shadow-lg">
                        {title}
                    </h1>

                    <p className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-100">
                        {description}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default CourseHero
