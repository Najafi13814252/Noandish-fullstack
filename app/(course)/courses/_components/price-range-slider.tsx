"use client"

import { useRef, useState } from "react"

import { cn } from "@/lib/utils"

import type { PriceBounds } from "@/lib/course-filters"

type PriceRangeSliderProps = {
    bounds: PriceBounds
    /** مقدار فعلی کف بازه؛ اگر کاربر فیلتری نداده باشد همان min بازه است */
    valueMin: number
    /** مقدار فعلی سقف بازه؛ اگر کاربر فیلتری نداده باشد همان max بازه است */
    valueMax: number
    /** هنگام رها کردن دستگیره یا تغییر با کیبورد صدا زده می‌شود */
    onCommit: (min: number, max: number) => void
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value))
}

const formatPrice = (value: number) => value.toLocaleString("fa-IR")

/**
 * اسلایدر دوطرفهٔ قیمت.
 * والد باید با key (بر اساس مقادیر URL) ریمونتش کند تا بعد از commit با آدرس همگام شود.
 */
function PriceRangeSlider({ bounds, valueMin, valueMax, onCommit }: PriceRangeSliderProps) {
    const { min, max, step } = bounds

    const [lo, setLo] = useState(() => clamp(valueMin, min, max))
    const [hi, setHi] = useState(() => clamp(valueMax, min, max))

    const trackRef = useRef<HTMLDivElement>(null)
    const draggingThumb = useRef<"lo" | "hi" | null>(null)

    const disabled = max <= min

    function valueFromClientX(clientX: number) {
        const track = trackRef.current

        if (!track) {
            return min
        }

        const rect = track.getBoundingClientRect()

        if (rect.width === 0) {
            return min
        }

        const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
        const raw = min + ratio * (max - min)

        return clamp(Math.round(raw / step) * step, min, max)
    }

    function thumbOf(event: { currentTarget: EventTarget & HTMLElement }): "lo" | "hi" {
        return event.currentTarget.dataset.thumb === "hi" ? "hi" : "lo"
    }

    function handleThumbPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if (disabled) {
            return
        }

        draggingThumb.current = thumbOf(event)
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    function handleThumbPointerMove(event: React.PointerEvent<HTMLDivElement>) {
        const thumb = draggingThumb.current

        if (!thumb) {
            return
        }

        const value = valueFromClientX(event.clientX)

        if (thumb === "lo") {
            setLo(Math.min(value, hi - step))
        } else {
            setHi(Math.max(value, lo + step))
        }
    }

    function handleThumbPointerUp() {
        if (!draggingThumb.current) {
            return
        }

        draggingThumb.current = null
        onCommit(lo, hi)
    }

    function handleTrackPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if (disabled || event.target !== event.currentTarget) {
            return
        }

        // کلیک روی مسیر: دستگیرهٔ نزدیک‌تر می‌پرد و بلافاصله commit می‌شود
        const value = valueFromClientX(event.clientX)

        if (value - lo <= hi - value) {
            const next = Math.min(value, hi - step)
            setLo(next)
            onCommit(next, hi)
        } else {
            const next = Math.max(value, lo + step)
            setHi(next)
            onCommit(lo, next)
        }
    }

    function handleThumbKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (disabled) {
            return
        }

        const thumb = thumbOf(event)

        let next: number | null = null

        if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
            next = thumb === "lo" ? clamp(lo - step, min, hi - step) : clamp(hi - step, lo + step, max)
        } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
            next = thumb === "lo" ? clamp(lo + step, min, hi - step) : clamp(hi + step, lo + step, max)
        } else if (event.key === "Home") {
            next = thumb === "lo" ? min : lo + step
        } else if (event.key === "End") {
            next = thumb === "hi" ? max : hi - step
        }

        if (next === null) {
            return
        }

        event.preventDefault()

        if (thumb === "lo") {
            setLo(next)
            onCommit(next, hi)
        } else {
            setHi(next)
            onCommit(lo, next)
        }
    }

    const range = max - min || 1
    const loPercent = ((lo - min) / range) * 100
    const hiPercent = ((hi - min) / range) * 100

    return (
        <div className={cn(disabled && "pointer-events-none opacity-50")}>
            <div className="flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>از {formatPrice(lo)}</span>
                <span>تا {formatPrice(hi)}</span>
            </div>

            {/* dir=ltr تا چپ همیشه کف قیمت و راست همیشه سقف باشد */}
            <div
                dir="ltr"
                ref={trackRef}
                className="relative mt-3 h-2 rounded-full bg-gray-200 dark:bg-gray-700"
                onPointerDown={handleTrackPointerDown}
            >
                <div
                    className="absolute inset-y-0 rounded-full bg-teal-500"
                    style={{ left: `${loPercent}%`, right: `${100 - hiPercent}%` }}
                />

                <div
                    role="slider"
                    aria-label="حداقل قیمت"
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={lo}
                    data-thumb="lo"
                    tabIndex={disabled ? -1 : 0}
                    className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-teal-500 bg-white shadow-md touch-none outline-none focus-visible:ring-3 focus-visible:ring-teal-500/30 active:cursor-grabbing"
                    style={{ left: `${loPercent}%` }}
                    onPointerDown={handleThumbPointerDown}
                    onPointerMove={handleThumbPointerMove}
                    onPointerUp={handleThumbPointerUp}
                    onPointerCancel={handleThumbPointerUp}
                    onKeyDown={handleThumbKeyDown}
                />

                <div
                    role="slider"
                    aria-label="حداکثر قیمت"
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={hi}
                    data-thumb="hi"
                    tabIndex={disabled ? -1 : 0}
                    className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-teal-500 bg-white shadow-md touch-none outline-none focus-visible:ring-3 focus-visible:ring-teal-500/30 active:cursor-grabbing"
                    style={{ left: `${hiPercent}%` }}
                    onPointerDown={handleThumbPointerDown}
                    onPointerMove={handleThumbPointerMove}
                    onPointerUp={handleThumbPointerUp}
                    onPointerCancel={handleThumbPointerUp}
                    onKeyDown={handleThumbKeyDown}
                />
            </div>
        </div>
    )
}

export default PriceRangeSlider
