"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import SectionHeader from "./section-header"

import { courseType } from "@/fake-data/courses"
import CourseCard from "@/components/custom/course-card"

interface CardSliderProps {
    courses: courseType[]
    title: string
}

function CardSlider({ title, courses }: CardSliderProps) {
    const [api, setApi] = useState<CarouselApi>()
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    useEffect(() => {
        if (!api) return

        const update = () => {
            setCanScrollPrev(api.canScrollPrev())
            setCanScrollNext(api.canScrollNext())
        }

        update()
        api.on("select", update)
        api.on("reInit", update)

        return () => {
            api.off("select", update)
            api.off("reInit", update)
        }
    }, [api])

    const actions = (
        <div className="hidden md:flex items-center gap-2">
            <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
            >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4 rtl:rotate-180" />
            </Button>

            <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
            >
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 rtl:rotate-180" />
            </Button>
        </div>
    )

    return (
        <SectionHeader title={title} actions={actions}>
            <div>
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        direction: "rtl"
                    }}
                    className="w-full"
                >
                    <CarouselContent className="my-4 mr-1">
                        {courses.map(course => (
                            <CarouselItem key={course.id} className="basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                                <CourseCard {...course} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </SectionHeader>
    )
}

export default CardSlider
