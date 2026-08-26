import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import SectionHeader from "./section-header"

import { courseType } from "@/fake-data/courses"
import CourseCard from "@/components/custom/course-card"

interface CardSliderProps {
    courses: courseType[]
    title: string
}

function CardSlider({ title, courses }: CardSliderProps) {
    return (
        <SectionHeader title={title}>
            <div>
                <Carousel
                    opts={{
                        align: "start",
                        direction: "rtl"
                    }}
                    className="w-full relative"
                >
                    <CarouselContent className="my-4 mr-1">
                        {courses.map(course => (
                            <CarouselItem key={course.id} className="lg:basis-1/5">
                                <CourseCard {...course} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious className="absolute -right-4 bg-white text-foreground shadow-sm" />
                        <CarouselNext className="absolute -left-4 bg-white text-foreground shadow-sm" /> */}
                </Carousel>
            </div>
        </SectionHeader>
    )
}

export default CardSlider
