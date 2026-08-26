import { Button } from "@/components/ui/button"
import { AiIdeaIcon, ArrowUpLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ReactNode } from "react"

type SectionHeadersProps = {
    title: string
    children: ReactNode
}

function SectionHeader({ title, children }: SectionHeadersProps) {
    return (
        <div>
            <section className="flex items-center justify-between ml-4 mr-5 mb-3">
                <div className="flex gap-2">
                    <HugeiconsIcon className="text-[#9AC1C3] size-8" icon={AiIdeaIcon} />
                    <p className="flex items-center text-2xl md:text-3xl font-heading text-primary dark:text-slate-200">دوره‌های  {title}</p>
                </div>

                <Button variant="outline" size="lg" className="text-primary">
                    همه دوره‌ها
                    <HugeiconsIcon icon={ArrowUpLeft01Icon} className="size-5" />
                </Button>
            </section>

            <section className="ml-4">
                {children}
            </section>
        </div>
    )
}
export default SectionHeader
