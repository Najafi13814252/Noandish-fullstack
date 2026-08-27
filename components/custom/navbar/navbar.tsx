'use client';

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { HugeiconsIcon } from "@hugeicons/react"
import { ShoppingBag03Icon } from "@hugeicons/core-free-icons"

import { ModeToggle } from "../mode-toggle"
import Logo from "./logo"
import Categories from "./categories"
import LoginDialog from "../auth/login-dialog"
import { Show, UserButton } from "@clerk/nextjs";


function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-10 border-b border-b-gray-300 dark:border-b-gray-800 bg-background">
            <section className="flex items-center gap-x-3 md:gap-x-6">
                {/* لوگو */}
                <Logo />

                <div className="hidden md:block">
                    <Categories />
                </div>
                {/* <Serach /> */}
            </section>

            <section className="flex items-center gap-x-3">
                {/* در موبایل فقط لوگو و دکمه theme نمایش داده می‌شود */}
                <ModeToggle />

                <Link href="#" className="hidden md:block">
                    <Button size="icon-lg" variant="outline" className="border border-primary/50">
                        <HugeiconsIcon icon={ShoppingBag03Icon} className="size-6! text-primary" />
                    </Button>
                </Link>

                <Show when="signed-out">
                    <div className="hidden md:block">
                        <LoginDialog />
                    </div>
                </Show>

                <Show when="signed-in">
                    <div className="hidden md:block">
                        <UserButton />
                    </div>
                </Show>
            </section>
        </header>
    )
}

export default Navbar
