import { notFound } from "next/navigation";

import { isCourseInCart } from "@/actions/cart";
import { isCoursePurchased } from "@/actions/payment";

import CourseChapters from "./_components/course-chapters";
import CourseDescription from "./_components/course-description";
import CourseHero from "./_components/course-hero";
import CoursePrerequisites from "./_components/course-prerequisites";
import CoursePurchaseCard from "./_components/course-purchase-card";
import CourseReviews from "./_components/course-reviews";
import CourseTeacher from "./_components/course-teacher";
import { getChaptersWithLessons, getCourse } from "@/data/courses";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function Course({ params }: CoursePageProps) {
  const { courseId } = await params;

  const [course, chapters, isInCart, purchased] = await Promise.all([
    getCourse(courseId),
    getChaptersWithLessons(courseId),
    isCourseInCart(courseId),
    isCoursePurchased(courseId),
  ])

  if (!course) {
    notFound();
  }

  // دوره‌های رایگان یا خریداری‌شده برای کاربر باز هستند
  const unlocked = purchased || course.discount === 100;

  // آدرس اولین درس دوره برای دکمه «ورود به دوره»
  const firstChapter = chapters[0];
  const firstLesson = firstChapter?.lessons[0];
  const firstLessonHref = firstChapter && firstLesson
    ? `/courses/${course.id}/chapters/${firstChapter.id}?lesson=${firstLesson.id}`
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
      {/* بخش اول: عکس، عنوان و توضیحات مختصر دوره */}
      <CourseHero {...course} />

      {/* بخش دوم: محتوا + کارت خرید */}
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-3">
        <div className="order-2 space-y-8 lg:order-1 lg:col-span-2">
          <CourseDescription paragraphs={course.fullDescription || ""} />

          {/* {detail.prerequisites.length > 0 && (
            <CoursePrerequisites prerequisites={detail.prerequisites} />
          )} */}

          <CourseChapters courseId={course.id} chapters={chapters} unlocked={unlocked} />

          <CourseTeacher teacher={course.teacher} />

          {/* <CourseReviews reviews={detail.reviews} rate={course.rate} /> */}
        </div>

        <div className="order-1 lg:order-2 lg:sticky lg:top-24">
          <CoursePurchaseCard {...course} isInCart={isInCart} purchased={purchased} firstLessonHref={firstLessonHref} />
        </div>
      </div>
    </div>
  );
}
