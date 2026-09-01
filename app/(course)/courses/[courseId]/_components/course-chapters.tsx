import Link from "next/link"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpenIcon, LockIcon, PlayCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

import CourseSection from "./course-section"
import { Chapter, Lesson } from "@/generated/prisma/client"

type CourseChaptersProps = {
    courseId: string
    chapters: ({ lessons: Lesson[] } & Chapter)[]
}

function CourseChapters({ courseId, chapters }: CourseChaptersProps) {
    const totalLessons = chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)

    return (
        <CourseSection
            icon={BookOpenIcon}
            title="سرفصل‌های دوره"
            subtitle={`${chapters.length} فصل - ${totalLessons} جلسه`}
        >
            <Accordion defaultValue={chapters[0] ? [chapters[0].id] : undefined}>
                {chapters.map(chapter => (
                    <AccordionItem key={chapter.id} value={chapter.id}>
                        <AccordionTrigger className="text-base font-medium flex items-center">
                            {chapter.title}
                        </AccordionTrigger>

                        <AccordionContent>
                            <ul className="space-y-1">
                                {chapter.lessons.map(lesson => (
                                    <li key={lesson.id}>
                                        <Link
                                            href={`/courses/${courseId}/chapters/${chapter.id}?lesson=${lesson.id}`}
                                            className={cn(
                                                "flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm no-underline! transition-colors",
                                                lesson.isLock
                                                    ? "text-gray-400 hover:bg-muted dark:text-gray-400"
                                                    : "text-gray-600 hover:bg-teal-500/10 hover:text-teal-600! dark:text-gray-200 dark:hover:text-teal-300!"
                                            )}
                                        >
                                            <span className="flex min-w-0 items-center gap-2">
                                                <HugeiconsIcon
                                                    icon={lesson.isLock ? LockIcon : PlayCircleIcon}
                                                    className={cn("size-5 shrink-0", lesson.isLock ? "text-gray-400" : "text-teal-500")}
                                                />
                                                <span className="truncate">{lesson.title}</span>
                                            </span>

                                            <span className="flex shrink-0 items-center gap-2 text-xs text-gray-400">
                                                <span className="whitespace-nowrap">{lesson.duration}</span>
                                            </span>
                                        </Link>
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
