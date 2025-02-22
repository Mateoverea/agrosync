import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CropManagement } from "@/components/operations/crop-management"
import { Packing } from "@/components/operations/packing"
import { TaskLog } from "@/components/operations/task-log"
import { Maintenance } from "@/components/operations/maintenance"

export default function OperationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#ECF0F1]">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Operations</h2>
          <div className="flex items-center space-x-2">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Create Task</Button>
          </div>
        </div>
        <Tabs defaultValue="crop-management" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger
              value="crop-management"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Crop Management
            </TabsTrigger>
            <TabsTrigger
              value="packing"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Packing
            </TabsTrigger>
            <TabsTrigger
              value="task-log"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Task Log
            </TabsTrigger>
            <TabsTrigger
              value="maintenance"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Maintenance
            </TabsTrigger>
          </TabsList>
          <TabsContent value="crop-management" className="space-y-4">
            <CropManagement />
          </TabsContent>
          <TabsContent value="packing" className="space-y-4">
            <Packing />
          </TabsContent>
          <TabsContent value="task-log" className="space-y-4">
            <TaskLog />
          </TabsContent>
          <TabsContent value="maintenance" className="space-y-4">
            <Maintenance />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

