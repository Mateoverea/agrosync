"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-browser"

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/signin")
  }

  return (
    <button
      onClick={handleSignOut}
      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign out
    </button>
  )
}

