import { ParagraphIcon } from "@hugeicons/core-free-icons"

import CourseSection from "./course-section"

type CourseDescriptionProps = {
    paragraphs: string[]
}

function CourseDescription({ paragraphs }: CourseDescriptionProps) {
    return (
        <CourseSection icon={ParagraphIcon} title="توضیحات دوره">
            <div className="space-y-4 text-justify leading-8 text-gray-600 dark:text-gray-200">
                {paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </CourseSection>
    )
}

export default CourseDescription
