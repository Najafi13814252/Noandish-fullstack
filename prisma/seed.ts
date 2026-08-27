import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

import { cards } from "../fake-data/courses";
import { getCourseDetail } from "../fake-data/course-details";

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true
});

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("پاک‌سازی داده‌های قبلی دوره‌ها...");

    // TRUNCATE برای ریست کردن auto_increment (اول جداول فرزند)
    await prisma.$executeRawUnsafe("TRUNCATE TABLE `Review`");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE `Lesson`");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE `Chapter`");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE `Course`");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE `Teacher`");

    // جلوگیری از ساخت مدرس تکراری (هر نام = یک مدرس)
    const teacherIds = new Map<string, number>();

    for (const card of cards) {
        const detail = getCourseDetail(card);
        const { teacher } = detail;

        let teacherId = teacherIds.get(teacher.name);
        if (!teacherId) {
            const created = await prisma.teacher.create({
                data: {
                    name: teacher.name,
                    role: teacher.role,
                    avatar: teacher.avatar,
                    bio: teacher.bio,
                    students: teacher.students,
                    courses: teacher.courses,
                    rating: teacher.rating,
                },
            });
            teacherId = created.id;
            teacherIds.set(teacher.name, teacherId);
        }

        const course = await prisma.course.create({
            data: {
                src: card.src,
                title: card.title,
                price: card.price,
                rate: card.rate,
                lesson: card.lesson,
                members: card.members,
                duration: card.duration,
                discount: card.discount,
                description: detail.description,
                fullDescription: detail.fullDescription,
                prerequisites: detail.prerequisites,
                language: detail.language,
                teacherId,
                chapters: {
                    create: detail.chapters.map(chapter => ({
                        title: chapter.title,
                        lessons: {
                            create: chapter.lessons.map(lesson => ({
                                title: lesson.title,
                                duration: lesson.duration,
                            })),
                        },
                    })),
                },
                reviews: {
                    create: detail.reviews.map(review => ({
                        name: review.name,
                        rating: review.rating,
                        date: review.date,
                        comment: review.comment,
                    })),
                },
            },
        });

        console.log(`دوره «${course.title}» ساخته شد (id: ${course.id})`);
    }

    const counts = {
        teachers: await prisma.teacher.count(),
        courses: await prisma.course.count(),
        chapters: await prisma.chapter.count(),
        lessons: await prisma.lesson.count(),
        reviews: await prisma.review.count(),
    };

    console.log("seed با موفقیت انجام شد:", counts);
}

main()
    .catch(error => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
