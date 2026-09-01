import Image from "next/image"
import Link from "next/link"

import { LockIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

type ChapterVideoPlayerProps = {
    videoUrl: string
    poster: string
    /** وقتی ویدئو قفل باشد به‌جای پلیر، قفل نمایش داده می‌شود */
    locked: boolean
    /** لینک بازگشت به صفحه دوره (برای حالت قفل) */
    backHref: string
}

function ChapterVideoPlayer({ videoUrl, poster, locked, backHref }: ChapterVideoPlayerProps) {
    if (locked) {
        return (
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-900">
                <Image
                    src={poster}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="scale-105 object-cover opacity-30 blur-sm"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <span className="flex size-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm md:size-20">
                        <HugeiconsIcon icon={LockIcon} className="size-7 text-white md:size-9" />
                    </span>

                    <p className="text-lg font-bold text-white md:text-xl">این ویدئو قفل است</p>

                    <p className="max-w-sm text-sm text-gray-300">
                        برای تماشای این ویدئو ابتدا باید دوره را تهیه کنید.
                    </p>

                    <Link href={backHref} className="mt-2 text-sm font-medium text-teal-300 underline-offset-4 hover:underline">
                        بازگشت به صفحه دوره
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <video
            key={videoUrl}
            controls
            preload="metadata"
            poster={poster}
            src={videoUrl}
            className="aspect-video w-full rounded-2xl bg-black"
        >
            مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
        </video>
    )
}

export default ChapterVideoPlayer
