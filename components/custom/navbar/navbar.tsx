import Link from "next/link"

import { Button } from "@/components/ui/button"

import { HugeiconsIcon } from "@hugeicons/react"
import { LogIn, ShoppingBag03Icon } from "@hugeicons/core-free-icons"

import { ModeToggle } from "../mode-toggle"
import Logo from "./logo"
import Categories from "./categories"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Register from "../auth/register"


function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-10 border-b border-b-gray-300 dark:border-b-gray-800 bg-background">
            <section className="flex items-center gap-x-6">
                {/* لوگو */}
                <Logo />

                <Categories />
                {/* <Serach /> */}
            </section>

            <section className="flex items-center gap-x-3">
                <ModeToggle />

                <Link href="#">
                    <Button size="icon-lg" variant="outline" className="border border-primary/50">
                        <HugeiconsIcon icon={ShoppingBag03Icon} className="size-6! text-primary" />
                    </Button>
                </Link>

                <Dialog>
                    <DialogTrigger render={
                        <Button size="lg" className="dark:bg-primary/10">
                            <HugeiconsIcon icon={LogIn} className="size-5 rotate-180" />
                            ورود | ثبت‌نام
                        </Button>
                    } />
                    <DialogContent>
                        <Register />
                    </DialogContent>
                </Dialog>
            </section>
        </header>
    )
}

export default Navbar
