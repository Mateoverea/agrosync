"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface HarvestedCrop {
  id: number
  name: string
  variety: string
  subvariety: string
  field: string
  quantity: string
  plantingDate: string
  harvestDate: string
}

interface HarvestFormProps {
  harvestedCrops: HarvestedCrop[]
}

export function HarvestForm({ harvestedCrops }: HarvestFormProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-primary">Harvested Crops</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead>Variety</TableHead>
              <TableHead>Subvariety</TableHead>
              <TableHead>Field</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Planting Date</TableHead>
              <TableHead>Harvest Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...harvestedCrops].reverse().map((crop) => (
              <TableRow key={crop.id}>
                <TableCell>{crop.name}</TableCell>
                <TableCell>{crop.variety}</TableCell>
                <TableCell>{crop.subvariety}</TableCell>
                <TableCell>{crop.field}</TableCell>
                <TableCell>{crop.quantity}</TableCell>
                <TableCell>{crop.plantingDate}</TableCell>
                <TableCell>{crop.harvestDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

