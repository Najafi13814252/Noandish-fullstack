"use client"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { categories } from "@/fake-data/categories"

import { cn } from "@/lib/utils"
import { MenuSquareIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useState } from "react"

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="p-0 hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent">
            <div className="flex items-center gap-x-2 text-primary text-lg">
              <HugeiconsIcon icon={MenuSquareIcon} className="size-5" />
              <span className="font-normal">دسته‌بندی‌ها</span>
            </div>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="flex w-170">
              {/* منوهای اصلی */}
              <ul className="grid w-[45%] pl-2">
                <li >
                  {categories.map((category, index) => (
                    <NavigationMenuLink key={category.id} onMouseEnter={() => setActiveIndex(index)} className={cn(
                      "group hover:bg-primary/10 group-hover:shadow-none",
                      activeIndex === index ? "bg-primary/10 text-primary " : ""
                    )} render={
                      <Link href="#" className="flex-row items-center gap-2">
                        <div className="bg-gray-50 shadow-inner rounded-full p-2 dark:bg-gray-50/10">
                          <HugeiconsIcon icon={category.icon_name} className="size-5 text-primary" />
                        </div>
                        <p className="font-medium">{category.title}</p>
                      </Link>
                    } />
                  ))}

                </li>
              </ul>
              {/* زیر منوها */}
              <div className="flex flex-col gap-9 pt-5 pr-4 py-2 w-[55%] bg-gray-100 rounded-2xl dark:bg-slate-800">
                {categories[activeIndex].items.map((item, index) => (
                  <div key={index} className="text-muted-foreground text-sm hover:text-primary duration-100 cursor-pointer">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Categories
