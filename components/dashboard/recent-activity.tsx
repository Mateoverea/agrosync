import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
  {
    id: 1,
    type: "Crop",
    action: "Irrigation completed",
    field: "Field A",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "Inventory",
    action: "Fertilizer restocked",
    field: "Warehouse",
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    type: "Maintenance",
    action: "Tractor serviced",
    field: "Equipment",
    timestamp: "Yesterday",
  },
  {
    id: 4,
    type: "Sales",
    action: "Order completed",
    field: "Customer XYZ",
    timestamp: "Yesterday",
  },
  {
    id: 5,
    type: "Finance",
    action: "Monthly report generated",
    field: "Accounting",
    timestamp: "2 days ago",
  },
]

export function RecentActivity() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4 rounded-md border border-secondary p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-primary">{activity.type}</p>
              <p className="text-sm text-text">
                {activity.action} - {activity.field}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">{activity.timestamp}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

