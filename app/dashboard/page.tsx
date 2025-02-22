"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { WeatherWidget } from "@/components/dashboard/weather-widget"

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
    <div className="flex min-h-screen flex-col bg-[#ECF0F1]">
      {/* Header con navegación */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Welcome to {companyData.name}'s ERP
          </h2>
        </div>

        {/* Tarjetas de Resumen */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Crops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card className="bg-secondary text-secondary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>
          <Card className="bg-accent text-accent-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,234</div>
            </CardContent>
          </Card>
          <Card className="bg-support text-text">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Sección de Resumen y Actividad */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-primary">Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="text-primary">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>

        {/* Widget del Clima */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Weather Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <WeatherWidget />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
