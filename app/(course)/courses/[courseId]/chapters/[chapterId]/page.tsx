import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight01Icon, Clock01Icon, LockIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { getChaptersWithLessons, getCourse } from "@/data/courses";
import { getCompletedLessonIds } from "@/data/user-progress";
import { isCoursePurchased } from "@/actions/payment";

import ChapterActions from "./_components/chapter-actions";
import ChapterVideoPlayer from "./_components/chapter-video-player";
import CourseLessonsAccordion from "./_components/course-lessons-accordion";

type ChapterPageProps = {
    params: Promise<{ courseId: string; chapterId: string }>;
    searchParams: Promise<{ lesson?: string | string[] }>;
};

export default async function ChapterPage({ params, searchParams }: ChapterPageProps) {
    const { courseId, chapterId } = await params;
    const { lesson: lessonParam } = await searchParams;

    const [course, chapters, completedLessonIds, purchased] = await Promise.all([
        getCourse(courseId),
        getChaptersWithLessons(courseId),
        getCompletedLessonIds(),
        isCoursePurchased(courseId),
    ]);

    if (!course) {
        notFound();
    }

    const chapter = chapters.find(item => item.id === chapterId);

    if (!chapter) {
        notFound();
    }

    // ویدئوی انتخاب‌شده از query string؛ اگر نبود اولین ویدئوی فصل نمایش داده می‌شود
    const requestedLessonId = Array.isArray(lessonParam) ? lessonParam[0] : lessonParam;
    const lesson = requestedLessonId
        ? chapter.lessons.find(item => item.id === requestedLessonId)
        : chapter.lessons[0];

    if (!lesson) {
        notFound();
    }

    // لیست مسطح همه ویدئوهای دوره برای دکمه‌های قبلی/بعدی
    const allLessons = chapters.flatMap(item =>
        item.lessons.map(lesson => ({ lesson, chapter: item }))
    );
    const currentIndex = allLessons.findIndex(
        item => item.chapter.id === chapter.id && item.lesson.id === lesson.id
    );
    const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : undefined;
    const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : undefined;

    // قفل ویدیوها فقط برای کاربری بسته می‌ماند که دوره را نخریده باشد؛
    // دوره‌های رایگان برای همه باز هستند
    const hasAccess = purchased || course.discount === 100;
    const locked = lesson.isLock && !hasAccess;
    const videoUrl = lesson.videoUrl ?? "/videoTest.mp4";
    const poster = lesson.posterUrl ?? course.imageUrl;

    return (
        <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
            {/* لینک بازگشت به دوره */}
            <Link
                href={`/courses/${course.id}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-300"
            >
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                بازگشت به صفحه دوره «{course.title}»
            </Link>

            <div className="mt-4 grid items-start gap-8 lg:grid-cols-3">
                {/* ستون اصلی: عنوان + پخش ویدئو + دکمه‌ها */}
                <div className="space-y-6 lg:col-span-2">
                    <Card className="border-teal-200 bg-white p-4 shadow-md shadow-teal-200 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none md:p-6">
                        <div className="mb-5 flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">{chapter.title}</Badge>

                            <span className="inline-flex items-center gap-1 text-sm text-gray-400">
                                <HugeiconsIcon icon={Clock01Icon} className="size-4" />
                                {lesson.duration}
                            </span>

                            {locked && (
                                <Badge variant="destructive">
                                    <HugeiconsIcon icon={LockIcon} />
                                    قفل است
                                </Badge>
                            )}
                        </div>

                        <h1 className="mb-5 text-xl font-bold text-gray-800 dark:text-white md:text-2xl">
                            {lesson.title}
                        </h1>

                        <ChapterVideoPlayer
                            videoUrl={videoUrl}
                            poster={poster}
                            locked={locked}
                            backHref={`/courses/${course.id}`}
                        />

                        <div className="mt-6">
                            <ChapterActions
                                courseId={course.id}
                                lesson={lesson}
                                locked={locked}
                                completed={completedLessonIds.includes(lesson.id)}
                                prev={prev && { chapterId: prev.chapter.id, lessonId: prev.lesson.id }}
                                next={next && { chapterId: next.chapter.id, lessonId: next.lesson.id }}
                            />
                        </div>
                    </Card>
                </div>

                {/* ستون کناری: آکاردئون سرفصل‌ها */}
                <aside className="lg:sticky lg:top-24">
                    <Card className="border-teal-200 bg-white shadow-md shadow-teal-200 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
                        <div className="border-b border-gray-100 p-4 dark:border-gray-700 md:p-5">
                            <h2 className="text-xl font-heading text-primary dark:text-slate-200">سرفصل‌های دوره</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                برای تماشای هر ویدئو روی آن کلیک کنید
                            </p>
                        </div>

                        <div className="p-2 md:p-3">
                            <CourseLessonsAccordion
                                courseId={course.id}
                                chapters={chapters}
                                currentChapterId={chapter.id}
                                currentLessonId={lesson.id}
                                completedLessonIds={completedLessonIds}
                                unlocked={hasAccess}
                            />
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
