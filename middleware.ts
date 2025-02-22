import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  // If the user is authenticated, add the user's company_id to the request headers
  if (session) {
    const { data: userData, error } = await supabase
      .from("users")
      .select("company_id, role, department")
      .eq("id", session.user.id)
      .single()

    if (userData) {
      req.headers.set("X-Company-ID", userData.company_id)
      req.headers.set("X-User-Role", userData.role)
      req.headers.set("X-User-Department", userData.department)
    }
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

