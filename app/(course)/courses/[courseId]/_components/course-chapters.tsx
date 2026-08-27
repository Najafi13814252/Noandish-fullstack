import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpenIcon, PlayCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { chapterType } from "@/fake-data/course-details"

import CourseSection from "./course-section"

type CourseChaptersProps = {
    chapters: chapterType[]
}

function CourseChapters({ chapters }: CourseChaptersProps) {
    const totalLessons = chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0)

    return (
        <CourseSection
            icon={BookOpenIcon}
            title="سرفصل‌های دوره"
            subtitle={`${chapters.length.toLocaleString('fa-IR')} فصل - ${totalLessons.toLocaleString('fa-IR')} جلسه`}
        >
            <Accordion defaultValue={chapters[0] ? [chapters[0].id] : undefined}>
                {chapters.map(chapter => (
                    <AccordionItem key={chapter.id} value={[chapter.id]}>
                        <AccordionTrigger className="text-base font-medium">
                            {chapter.title}
                        </AccordionTrigger>

                        <AccordionContent>
                            <ul className="space-y-3">
                                {chapter.lessons.map(lesson => (
                                    <li key={lesson.id} className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                                            <HugeiconsIcon icon={PlayCircleIcon} className="size-5 shrink-0 text-teal-500" />
                                            <span>{lesson.title}</span>
                                        </div>

                                        <span className="text-sm whitespace-nowrap text-gray-400">
                                            {lesson.duration}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CourseSection>
    )
}

export default CourseChapters
