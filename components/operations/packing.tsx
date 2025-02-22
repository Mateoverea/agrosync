import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const packingOrders = [
  { id: 1, product: "Corn", quantity: 1000, unit: "kg", packingDate: "2023-09-20", status: "In Progress" },
  { id: 2, product: "Wheat Flour", quantity: 500, unit: "kg", packingDate: "2023-09-21", status: "Completed" },
  { id: 3, product: "Soybean Oil", quantity: 200, unit: "L", packingDate: "2023-09-22", status: "Scheduled" },
  { id: 4, product: "Tomato Sauce", quantity: 1000, unit: "bottles", packingDate: "2023-09-23", status: "In Progress" },
]

export function Packing() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Packing Orders</CardTitle>
        <CardDescription>Current packing orders and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Packing Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packingOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.unit}</TableCell>
                <TableCell>{order.packingDate}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

