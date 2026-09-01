import { notFound } from "next/navigation";

import { isCourseInCart } from "@/actions/cart";

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

  const [course, chapters, isInCart] = await Promise.all([
    getCourse(courseId),
    getChaptersWithLessons(courseId),
    isCourseInCart(courseId)
  ])

  if (!course) {
    notFound();
  }

  console.log(chapters);
  

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

          <CourseChapters courseId={course.id} chapters={chapters} />

          <CourseTeacher teacher={course.teacher} />

          {/* <CourseReviews reviews={detail.reviews} rate={course.rate} /> */}
        </div>

        <div className="order-1 lg:order-2 lg:sticky lg:top-24">
          <CoursePurchaseCard {...course} isInCart={isInCart} />
        </div>
      </div>
    </div>
  );
}
