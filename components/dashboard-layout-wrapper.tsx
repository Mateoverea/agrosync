"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-browser"
import SignOutButton from "@/components/sign-out-button"

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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">AgroSync</span>
              </div>
            </div>
            <div className="flex items-center">
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}

