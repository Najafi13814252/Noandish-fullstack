import { bestCategories } from "@/fake-data/best-categories"

import { HugeiconsIcon } from "@hugeicons/react"

function BestCategories() {
    return (
        <section className="flex flex-col justify-center gap-10 text-gray-800 bg-teal-50 w-full py-10 px-2 dark:bg-transparent">
            <div className="flex flex-col items-center gap-2">
                <span className="font-heading text-primary text-3xl dark:text-white">دسته‌بندی‌های برتر</span>
                <p className="text-lg text-gray-500 text-center dark:text-gray-300">در چه زمینه‌ای میخواهید آموزش ببینید؟</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-10">
                {bestCategories.map(category => (
                    <div key={category.id} className="flex items-center gap-4 bg-white border border-gray-300 rounded-lg p-2 group cursor-pointer hover:scale-110 hover:border-primary hover:shadow-lg duration-200 dark:bg-gray-800 dark:border-gray-600" v-for="category in categories">
                        <div className="bg-gray-100 flex items-center p-4 rounded-full group-hover:bg-primary dark:bg-gray-700">
                            <HugeiconsIcon className="text-3xl text-primary group-hover:text-white dark:text-white" icon={category.icon} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium group-hover:text-primary dark:text-white dark:group-hover:text-white">{category.title}</span>
                            <p className="text-gray-500 text-xs">{category.course_number}+ دوره </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BestCategories
