"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/operations",
      label: "Operations",
      active: pathname === "/operations",
    },
    {
      href: "/sales-marketing",
      label: "Sales & Marketing",
      active: pathname === "/sales-marketing",
    },
    {
      href: "/finance-admin",
      label: "Finance & Admin",
      active: pathname === "/finance-admin",
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-text",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

