import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const tasks = [
  { id: 1, task: "Irrigation", assignedTo: "John Doe", dueDate: "2023-09-25", status: "In Progress" },
  { id: 2, task: "Fertilizer Application", assignedTo: "Jane Smith", dueDate: "2023-09-26", status: "Scheduled" },
  { id: 3, task: "Pest Control", assignedTo: "Mike Johnson", dueDate: "2023-09-27", status: "Completed" },
  { id: 4, task: "Harvesting", assignedTo: "Sarah Williams", dueDate: "2023-09-28", status: "Scheduled" },
]

export function TaskLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Log</CardTitle>
        <CardDescription>Overview of current and upcoming tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.task}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

