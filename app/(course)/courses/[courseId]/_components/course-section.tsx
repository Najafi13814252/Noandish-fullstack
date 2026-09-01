import { Card } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ComponentProps, ReactNode } from "react"

type CourseSectionProps = {
    icon: ComponentProps<typeof HugeiconsIcon>["icon"]
    title: string
    subtitle?: ReactNode
    children: ReactNode
}

function CourseSection({ icon, title, subtitle, children }: CourseSectionProps) {
    return (
        <Card className="border-teal-200 bg-white shadow-md shadow-teal-200 dark:bg-gray-800 dark:border-gray-700 dark:shadow-none p-4 md:p-6">
            <div className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-primary dark:bg-gray-700 dark:text-slate-200">
                    <HugeiconsIcon icon={icon} className="size-6" />
                </span>

                <div>
                    <h2 className="text-2xl font-heading text-primary dark:text-slate-200">{title}</h2>
                    {subtitle && <p className="text-sm text-gray-500 dark:text-gray-300">{subtitle}</p>}
                </div>
            </div>

            {children}
        </Card>
    )
}

export default CourseSection
