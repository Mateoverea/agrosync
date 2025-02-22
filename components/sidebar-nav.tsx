"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Sprout, BarChart3, Calculator } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, figure: "12 Tasks" },
  { href: "/operations", label: "Operations", icon: Sprout, figure: "8 Crops" },
  { href: "/sales-marketing", label: "Sales & Marketing", icon: BarChart3, figure: "$15,234" },
  { href: "/finance-admin", label: "Finance & Admin", icon: Calculator, figure: "3 Reports" },
]

export function SidebarNav() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] bg-background transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16",
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="flex h-full flex-col items-start p-4">
        {navItems.map((item) => (
          <Button
            key={item.href}
            asChild
            variant="ghost"
            className={cn(
              "w-full justify-start gap-4 px-2 py-6",
              pathname === item.href ? "bg-muted" : "hover:bg-muted",
              isExpanded ? "px-4" : "px-2",
            )}
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              {isExpanded && (
                <div className="flex w-full items-center justify-between">
                  <span>{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.figure}</span>
                </div>
              )}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}


