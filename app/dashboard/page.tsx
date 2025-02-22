"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null)
  const [companyData, setCompanyData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        setError("No session found. Please sign in.")
        router.push("/signin")
        return
      }

      let { data: user, error: userError } = await supabase
        .from("users")
        .select("role, department, company_id")
        .eq("id", session.user.id)
        .single()

      if (userError) {
        console.error("Error fetching user data:", userError)

        // If the user doesn't exist, create a new user record
        if (userError.code === "PGRST116") {
          const { data: newUser, error: createError } = await supabase
            .from("users")
            .insert({
              id: session.user.id,
              email: session.user.email!,
              role: "admin",
              department: null,
              company_id: null,
            })
            .select()
            .single()

          if (createError) {
            setError("Error creating user record. Please contact support.")
            return
          }

          user = newUser
        } else {
          setError("Error loading user data. Please try signing in again.")
          return
        }
      }

      setUserData(user)

      if (!user || !user.company_id) {
        // Redirect to company creation page if no company is associated
        router.push("/create-company")
        return
      }

      const { data: company, error: companyError } = await supabase
        .from("companies")
        .select("name")
        .eq("id", user.company_id)
        .single()

      if (companyError) {
        console.error("Error fetching company data:", companyError)
        setError("Error loading company data. Please try again later.")
        return
      }

      setCompanyData(company)
    }

    fetchData()
  }, [supabase, router])

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>
  }

  if (!userData || !companyData) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome to {companyData.name}'s ERP</h2>
          <p className="mt-2 text-gray-600">Role: {userData.role || "Not set"}</p>
          <p className="mt-2 text-gray-600">Department: {userData.department || "Not set"}</p>
        </div>
      </div>
    </main>
  )
}

