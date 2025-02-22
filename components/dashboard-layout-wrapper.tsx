"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-browser"
import SignOutButton from "@/components/sign-out-button"
import { Button } from "@/components/ui/button"
import { Bell, Settings } from "lucide-react"

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b flex items-center justify-between px-4 shadow-sm">
      <div className="font-semibold text-lg text-indigo-600">AgroSync</div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <SignOutButton />
      </div>
    </div>
  )
}

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        router.push("/signin")
      } else {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [router, supabase])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative top-14">
      {/* Nueva barra superior */}
      <TopBar />

      {/* Espaciado para que el contenido no quede detrás de la barra fija */}
      <div className="pt-16">{children}</div>
    </div>
  )
}
