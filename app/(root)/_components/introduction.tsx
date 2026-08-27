import { introduction } from "@/fake-data/intruduction"

import { HugeiconsIcon } from "@hugeicons/react"

function Introduction() {
    return (
        <section className="flex flex-col justify-center items-center gap-12 bg-gray-50 py-10 px-4 md:px-8 dark:bg-gray-800">
            <span className="font-heading text-primary text-2xl md:text-3xl text-center dark:text-white">چرا نواندیش؟</span>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-28">
                {introduction.map(intro => (
                    <div key={intro.id} className="flex flex-col items-center text-center gap-4">
                        <div className="flex items-center border border-primary p-4 rounded-3xl dark:border-primary bg-primary/10">
                            <HugeiconsIcon className="size-7 text-primary dark:text-gray-200" icon={intro.icon_name} />
                        </div>
                        <p className="w-40 h-20 text-gray-800 dark:text-white">{intro.title}</p>
                    </div>
                ))}
            </div>
        </section >
    )
}

export default Introduction
