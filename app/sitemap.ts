import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

/**
 * نقشهٔ سایت: صفحهٔ اصلی، فهرست دوره‌ها و همهٔ صفحات دوره.
 * صفحات درس (chapter) عمداً ایندکس نمی‌شوند تا با صفحهٔ دوره رقابت نکنند.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const courses = await prisma.course.findMany({
        select: {
            id: true,
            createdAt: true,
        },
    });

    const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
        url: `${SITE_URL}/courses/${course.id}`,
        lastModified: course.createdAt,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${SITE_URL}/courses`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        ...courseEntries,
    ];
}