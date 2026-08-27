import Image from "next/image"
import Link from "next/link"

import { HugeiconsIcon } from "@hugeicons/react"
import { AiIdeaIcon, BookOpen01Icon, Target02Icon } from "@hugeicons/core-free-icons"

function Hero() {
    return (
        <section className="flex lg:flex-row flex-col-reverse items-center justify-between px-2 md:px-6 rounded-lg font-dana">
            <div className="text-center lg:text-right">
                <p className="md:text-5xl text-4xl text-teal-700 leading-normal font-heading dark:text-slate-200">آموزش‌های تخصصی همراه با توسعه فردی
                    برای سازمان‌ها و شرکت‌ها <br /> با <span className="text-secondary dark:text-primary">بنیاد تعالی آموزش نو اندیش</span></p>
                <p className="md:text-lg text-base font-medium max-w-lg mx-auto lg:mx-0 text-gray-500 leading-relaxed my-8 dark:text-gray-200">بهترین و بروزترین
                    آموزش‌ها با بهترین و مجرب‌ترین اساتید ایران از مبتدی تا پیشرفته، کارمند تا فریلنسر همه باهم برای پیشرفت و
                    تعالی</p>

                <div className="flex gap-4 items-center justify-center lg:justify-normal">
                    <button
                        className="w-full md:w-fit flex items-center justify-center gap-2 text-first bg-second px-6 py-2 rounded-full text-primary bg-secondary cursor-pointer">
                        <HugeiconsIcon icon={Target02Icon} />
                        <span className="text-lg font-medium cursor-pointer">شروع کنید</span>
                    </button>
                    <Link href="/learns" className="w-full md:w-fit flex items-center justify-center gap-2 text-white bg-first px-6 py-2 rounded-full bg-primary cursor-pointer dark:bg-secondary dark:border dark:border-primary/50 dark:text-slate-200">
                        <HugeiconsIcon icon={BookOpen01Icon} />
                        <span className="text-lg font-medium cursor-pointer">دوره‌های ما</span>
                    </Link>
                </div>
            </div>

            <Image src="/hero.avif" alt="Hero_Image" width={1024} height={1024} loading="eager" sizes="(max-width: 1024px) 100vw, 50vw" className="w-full max-w-2xl h-auto" />

        </section>
    )
}

export default Hero
