import { Star } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

type StarRatingProps = {
    rate: number
    size?: string
}

function StarRating({ rate, size = "size-4" }: StarRatingProps) {
    return (
        <div className="flex flex-row-reverse items-end">
            {Array.from({ length: 5 }).map((_, index) => {
                const fill = Math.max(0, Math.min(1, rate - index))

                return (
                    <div key={index} className="relative" dir="ltr">
                        <HugeiconsIcon
                            icon={Star}
                            className={`${size} text-gray-300 fill-gray-300`}
                        />

                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fill * 100}%` }}
                        >
                            <HugeiconsIcon
                                icon={Star}
                                className={`${size} text-yellow-400 fill-yellow-400`}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default StarRating
