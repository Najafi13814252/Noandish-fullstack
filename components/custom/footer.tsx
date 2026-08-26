import { links } from "@/fake-data/links"

import { ArrowLeft02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import Image from "next/image"

function Footer() {
    return (
        <>
            <footer className="bg-primary pt-10 pb-20 my-10 md:my-0 dark:bg-gray-800">
                <div className="w-fit mx-4 lg:pr-20">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-36 items-center text-gray-100">
                        {/* introduction */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center">
                                <div className="bg-white rounded-full">
                                    <Image src="/logo.avif" width={80} height={80} loading="lazy" alt="Logo" className="w-20 h-20 relative right-1" />
                                </div>
                                <div className="flex flex-col gap-1 items-start relative bottom-1 pr-1 whitespace-nowrap">
                                    <span className="text-3xl font-heading text-secondary dark:text-primary">نو اندیش</span>
                                    <span className="text-xs text-white">بنیاد تعالی آموزشی</span>
                                </div>
                            </div>
                            <p className="w-full lg:w-80">بنیاد تعالی آموزشی نواندیش با هدف ارتقاء دانش و مهارت‌های تخصصی در سازمان‌ها و
                                شرکت‌ها، با
                                بهره‌گیری از اساتید
                                مجرب و محتوای به‌روز، بستری حرفه‌ای برای آموزش و توسعه منابع انسانی فراهم کرده است.
                                ما همراه شما هستیم در مسیر رشد، یادگیری و تعالی سازمانی.
                            </p>
                            <div className="flex items-center gap-4">
                                {links.apps.map(app => (
                                    <div key={app.id} className="flex items-center p-2 rounded-full bg-gray-200 cursor-pointer hover:scale-125 duration-200 dark:bg-primary/20">
                                        <HugeiconsIcon className="text-primary size-6" icon={app.icon_name} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-40 w-full">
                            {/* quick links */}
                            <li className="flex flex-col gap-1">
                                <span className="mb-3 font-medium">لینک‌های سریع</span>
                                {links.quick.map(qu => (
                                    <ul key={qu.id} className="flex items-center gap-2 cursor-pointer hover:text-secondary dark:hover:text-primary duration-200">
                                        <HugeiconsIcon icon={ArrowLeft02Icon} className="size-5"/>
                                        <span>{qu.title}</span>
                                    </ul>
                                ))}
                            </li>

                            {/* useful links  */}
                            <li className="flex flex-col gap-1">
                                <span className="mb-3 font-medium">لینک‌های کاربردی</span>
                                {links.useful.map(use => (
                                    <ul key={use.id} className="flex items-center gap-2 cursor-pointer hover:text-secondary dark:hover:text-primary duration-200">
                                        <HugeiconsIcon icon={ArrowLeft02Icon} className="size-5"/>
                                        <span>{use.title}</span>
                                    </ul>
                                ))}
                            </li >

                            {/* concat us */}
                            < li className="flex flex-col gap-3" >
                                <span className="mb-3 font-medium">ارتباط با ما</span>
                                {links.concat.map(concat => (
                                    <ul key={concat.id} className="flex items-center gap-2">
                                        <HugeiconsIcon icon={concat.icon_name} className="size-5"/>
                                        <span>{concat.title}</span>
                                    </ul>
                                ))}
                            </li >
                        </ul >
                    </div >
                </div >
            </footer>

            {/* mobile footer */}
            {/* <MobileFooter /> */}
        </>
    )
}

export default Footer
