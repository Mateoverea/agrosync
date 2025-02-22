"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-browser"

type AuthFormProps = {
  type: "signup" | "signin"
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (type === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        console.error("Signup error:", error)
        setError(error.message)
      } else {
        console.log("Signup successful:", data)

        // Create user record in the users table
        const { error: userError } = await supabase.from("users").insert({
          id: data.user!.id,
          email: data.user!.email!,
          company_id: null, // We'll set this later when creating a company
          role: "admin", // Default role for new signups
          department: null, // We'll set this later
        })

        if (userError) {
          console.error("Error creating user record:", userError)
          setError("Error creating user record. Please try again.")
        } else {
          setSuccess(true)
          setTimeout(() => router.push("/signin"), 3000)
        }
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error("Signin error:", error)
        setError(error.message)
      } else {
        console.log("Signin successful:", data)
        router.push("/dashboard")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {type === "signup" && (
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Sign up successful! Redirecting to sign in...</p>}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  )
}

