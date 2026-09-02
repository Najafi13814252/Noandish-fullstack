import type { Metadata } from "next";
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
import { JsonLd } from "@/components/custom/json-ld";
import { getChaptersWithLessons, getCourse } from "@/data/courses";
import { getEffectivePrice } from "@/lib/course-filters";
import { SITE_NAME, SITE_ORGANIZATION_NAME, SITE_URL, truncateText } from "@/lib/seo";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params;

  // به‌دلیل cache شدن getCourse، این فراخوانی با فراخوانیِ صفحه مشترک است
  const course = await getCourse(courseId);

  if (!course) {
    return { title: "دوره پیدا نشد" };
  }

  const description = truncateText(course.description ?? course.title);

  return {
    title: course.title,
    description,
    alternates: {
      canonical: `/courses/${course.id}`,
    },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: `/courses/${course.id}`,
      siteName: SITE_NAME,
      title: `${course.title} | ${SITE_NAME}`,
      description,
      images: [
        {
          url: course.imageUrl,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | ${SITE_NAME}`,
      description,
      images: [course.imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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

  // structured data دوره برای نمایش بهتر در نتایج جستجو
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description ?? course.title,
    image: course.imageUrl,
    url: `${SITE_URL}/courses/${course.id}`,
    inLanguage: "fa-IR",
    isAccessibleForFree: course.discount >= 100,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_ORGANIZATION_NAME,
      sameAs: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: getEffectivePrice(course),
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "دوره‌ها", item: `${SITE_URL}/courses` },
      { "@type": "ListItem", position: 3, name: course.title },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
      <JsonLd data={courseJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

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
