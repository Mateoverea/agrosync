import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const maintenanceTasks = [
  { id: 1, equipment: "Tractor", lastMaintenance: "2023-08-15", nextMaintenance: "2023-10-15", status: "Operational" },
  {
    id: 2,
    equipment: "Irrigation System",
    lastMaintenance: "2023-09-01",
    nextMaintenance: "2023-11-01",
    status: "Needs Repair",
  },
  {
    id: 3,
    equipment: "Harvester",
    lastMaintenance: "2023-07-30",
    nextMaintenance: "2023-09-30",
    status: "Under Maintenance",
  },
  {
    id: 4,
    equipment: "Greenhouse Climate Control",
    lastMaintenance: "2023-08-30",
    nextMaintenance: "2023-10-30",
    status: "Operational",
  },
]

export function Maintenance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Schedule</CardTitle>
        <CardDescription>Equipment maintenance status and schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Next Maintenance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.equipment}</TableCell>
                <TableCell>{task.lastMaintenance}</TableCell>
                <TableCell>{task.nextMaintenance}</TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

