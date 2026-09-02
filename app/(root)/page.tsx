import type { Metadata } from "next";

import CardSlider from "./_components/card-slider";
import Hero from "./_components/hero";
import BestCategories from "./_components/best-categories";
import Introduction from "./_components/introduction";
import { getCourses } from "@/data/courses";
import { getWishlistedCourseIds } from "@/data/wishlist";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
    // absolute تا قالب « | نواندیش» ریشه به این عنوانِ از قبل کامل اضافه نشود
    title: { absolute: SITE_TITLE },
    description: SITE_DESCRIPTION,
    alternates: {
        canonical: "/",
    },
};

export default async function Home() {
  const [courses, wishlistedCourseIds] = await Promise.all([
    getCourses(),
    getWishlistedCourseIds(),
  ])
  return (
    <div className="space-y-12 md:space-y-20">
      <Hero />

      <CardSlider title="محبوب" courses={courses} wishlistedCourseIds={wishlistedCourseIds} />

      <BestCategories />

      <CardSlider title="رایگان" courses={courses} wishlistedCourseIds={wishlistedCourseIds} />

      <CardSlider title="تخفیفی" courses={courses} wishlistedCourseIds={wishlistedCourseIds} />

      <Introduction />
    </div>
  );
}
