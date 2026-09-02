"use client";

import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckmarkCircle02Icon, LockIcon, PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

import { Chapter, Lesson } from "@/generated/prisma/client";

type CourseLessonsAccordionProps = {
    courseId: string;
    chapters: ({ lessons: Lesson[] } & Chapter)[];
    currentChapterId: string;
    currentLessonId: string;
    /** شناسه درس‌هایی که کاربر «کامل دیده» است (از سرور می‌آید) */
    completedLessonIds: string[];
    /** آیا قفل ویدیوهای این دوره برای کاربر باز است؟ */
    unlocked: boolean;
};

function CourseLessonsAccordion({ courseId, chapters, currentChapterId, currentLessonId, completedLessonIds, unlocked }: CourseLessonsAccordionProps) {
    return (
        <Accordion defaultValue={[currentChapterId]} className="border-0">
            {chapters.map(chapter => (
                <AccordionItem key={chapter.id} value={chapter.id}>
                    <AccordionTrigger
                        className={cn(
                            "text-base font-medium",
                            chapter.id === currentChapterId && "text-teal-600 dark:text-teal-300"
                        )}
                    >
                        <span className="flex-1">{chapter.title}</span>
                        <Badge variant="secondary" className="me-1">
                            {chapter.lessons.length.toLocaleString('fa-IR')} ویدئو
                        </Badge>
                    </AccordionTrigger>

                    <AccordionContent>
                        <ul className="space-y-1">
                            {chapter.lessons.map(lesson => (
                                <LessonLink
                                    key={lesson.id}
                                    courseId={courseId}
                                    chapterId={chapter.id}
                                    lesson={lesson}
                                    isCurrent={chapter.id === currentChapterId && lesson.id === currentLessonId}
                                    isWatched={completedLessonIds.includes(lesson.id)}
                                    unlocked={unlocked}
                                />
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

type LessonLinkProps = {
    courseId: string;
    chapterId: string;
    lesson: Lesson;
    isCurrent: boolean;
    isWatched: boolean;
    unlocked: boolean;
};

function LessonLink({ courseId, chapterId, lesson, isCurrent, isWatched, unlocked }: LessonLinkProps) {
    const locked = lesson.isLock && !unlocked;

    return (
        <li>
            <Link
                href={`/courses/${courseId}/chapters/${chapterId}?lesson=${lesson.id}`}
                className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm no-underline! transition-colors hover:text-teal-600! dark:hover:text-teal-300!",
                    isCurrent
                        ? "bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300"
                        : "text-gray-600 hover:bg-muted dark:text-gray-200"
                )}
            >
                <HugeiconsIcon
                    icon={locked ? LockIcon : PlayCircleIcon}
                    className={cn("size-5 shrink-0", locked ? "text-gray-400" : "text-teal-500")}
                />

                <span className="flex-1 truncate">{lesson.title}</span>

                {isCurrent && (
                    <Badge variant="secondary" className="hidden text-[10px] sm:inline-flex">
                        در حال مشاهده
                    </Badge>
                )}

                {isWatched && (
                    <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        className="size-4 shrink-0 text-teal-500"
                    />
                )}

                <span className="text-xs whitespace-nowrap text-gray-400">{lesson.duration}</span>
            </Link>
        </li>
    );
}

export default CourseLessonsAccordion;
