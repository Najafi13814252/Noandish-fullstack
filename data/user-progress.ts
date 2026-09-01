"use server"

import { currentUser } from "@clerk/nextjs/server"

import { prisma } from "@/lib/prisma"

/** شناسه درس‌هایی که کاربر واردشده «کامل دیده» است؛ برای مهمان‌ها خالی برمی‌گردد */
export async function getCompletedLessonIds() {
    const user = await currentUser()

    if (!user) {
        return []
    }

    const progresses = await prisma.userProgress.findMany({
        where: {
            userId: user.id,
            isComplated: true,
        },
        select: {
            lessonId: true,
        },
    })

    return progresses.map(item => item.lessonId)
}
