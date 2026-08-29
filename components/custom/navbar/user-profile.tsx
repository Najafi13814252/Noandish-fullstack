import { Button } from "@/components/ui/button"
import { User } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

function UserProfile() {
    return (
        <Button variant="outline" size="icon-lg" className="border border-primary/50">
            <Link href="/user/profile/favorites">
                <HugeiconsIcon icon={User} className="size-6 text-primary"/>
            </Link>
        </Button>
    )
}

export default UserProfile
