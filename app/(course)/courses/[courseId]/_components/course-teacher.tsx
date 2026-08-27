import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookBookmark01Icon, TeacherIcon, UserMultipleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { teacherType } from "@/fake-data/course-details"

import CourseSection from "./course-section"
import StarRating from "./star-rating"

type CourseTeacherProps = {
    teacher: teacherType
}

function CourseTeacher({ teacher }: CourseTeacherProps) {
    return (
        <CourseSection icon={TeacherIcon} title="درباره مدرس">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
                <Avatar className="size-20 border border-teal-200 dark:border-gray-700">
                    <AvatarImage src={teacher.avatar} alt={teacher.name} />
                    <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{teacher.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300">{teacher.role}</p>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <StarRating rate={teacher.rating} />
                            <span className="text-sm text-gray-500 dark:text-gray-300">({teacher.rating})</span>
                        </div>
                    </div>

                    <p className="mt-4 text-justify leading-8 text-gray-600 dark:text-gray-200">
                        {teacher.bio}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <span className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                            <HugeiconsIcon icon={UserMultipleIcon} className="size-5 text-teal-500" />
                            {teacher.students.toLocaleString('fa-IR')} دانشجو
                        </span>

                        <span className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                            <HugeiconsIcon icon={BookBookmark01Icon} className="size-5 text-teal-500" />
                            {teacher.courses.toLocaleString('fa-IR')} دوره آموزشی
                        </span>
                    </div>
                </div>
            </div>
        </CourseSection>
    )
}

export default CourseTeacher
