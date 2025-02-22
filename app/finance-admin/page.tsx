import { MainNav } from "@/components/main-nav"

export default function FinanceAdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Finance & Administration</h2>
        <p>Finance and administration content will be displayed here.</p>
      </main>
    </div>
  )
}

