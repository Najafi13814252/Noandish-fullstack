// اجرا: npx tsx script.ts 

import { prisma } from "./lib/prisma";

async function main() {
    await prisma.lesson.createMany({
        data: [
            {
                title: 'آشنایی با دوره و نقشه راه',
                isLock: false,
                chapterId: 'ca976efd-9ee6-4476-af8d-b3e33af8578a'
            },
            {
                title: 'خودشناسی؛ نقطه شروع تغییر',
                isLock: false,
                chapterId: 'ca976efd-9ee6-4476-af8d-b3e33af8578a'
            },
            {
                title: 'تعیین اهداف هوشمند (SMART)',
                isLock: true,
                chapterId: 'ca976efd-9ee6-4476-af8d-b3e33af8578a'
            },
        ]
    });
    console.log("Created chapters");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });