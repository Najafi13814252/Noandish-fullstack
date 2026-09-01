import { ParagraphIcon } from "@hugeicons/core-free-icons"

import CourseSection from "./course-section"

type CourseDescriptionProps = {
    paragraphs: string
}

function CourseDescription({ paragraphs }: CourseDescriptionProps) {
    return (
        <CourseSection icon={ParagraphIcon} title="توضیحات دوره">
            <div className="space-y-4 text-justify leading-8 text-gray-600 dark:text-gray-200">
                <p>{paragraphs || 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus commodi itaque unde similique explicabo quisquam vel dolorem odio error eaque?'}</p>
            </div>
        </CourseSection>
    )
}

export default CourseDescription
