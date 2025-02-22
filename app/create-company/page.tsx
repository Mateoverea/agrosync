"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-browser"

export default function CreateCompany() {
  const [companyName, setCompanyName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      setError("No session found. Please sign in.")
      router.push("/signin")
      return
    }

    // Create company
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .insert({ name: companyName })
      .select()
      .single()

    if (companyError) {
      console.error("Error creating company:", companyError)
      setError("Error creating company. Please try again.")
      return
    }

    // Update user with company_id
    const { error: updateError } = await supabase
      .from("users")
      .update({ company_id: company.id })
      .eq("id", session.user.id)

    if (updateError) {
      console.error("Error updating user:", updateError)
      setError("Error associating user with company. Please contact support.")
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your company</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              id="company-name"
              name="company"
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

