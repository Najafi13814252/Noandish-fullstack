"use client"

import { useTheme } from "next-themes"

import { HugeiconsIcon } from "@hugeicons/react"
import { Monitor, Moon, Sun } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {

    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="outline" size="icon-lg" className="border border-primary/50">
                    <HugeiconsIcon icon={Sun} className="size-6 text-primary scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <HugeiconsIcon icon={Moon} className="absolute size-6 text-primary scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>}
            />
            <DropdownMenuContent align="end" className="text-primary">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <HugeiconsIcon icon={Sun} className="size-5" />
                    حالت روشن
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <HugeiconsIcon icon={Moon} className="size-5" />
                    حالت تاریک
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <HugeiconsIcon icon={Monitor} className="size-5" />
                    حالت سیستم
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
