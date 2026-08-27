import { CheckmarkCircle02Icon, QueueIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import CourseSection from "./course-section"

type CoursePrerequisitesProps = {
    prerequisites: string[]
}

function CoursePrerequisites({ prerequisites }: CoursePrerequisitesProps) {
    return (
        <CourseSection icon={QueueIcon} title="پیش‌نیازهای دوره">
            <ul className="space-y-3">
                {prerequisites.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-5 shrink-0 text-teal-500" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </CourseSection>
    )
}

export default CoursePrerequisites
