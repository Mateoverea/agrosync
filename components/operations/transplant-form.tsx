"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Crop {
  id: number
  name: string
  variety: string
  subvariety: string
  field: string
  quantity: string
  transplantDate: string
  expectedHarvest: string
}

interface TransplantFormProps {
  transplantedCrops: Crop[]
  onHarvest: (id: number) => void
}

export function TransplantForm({ transplantedCrops, onHarvest }: TransplantFormProps) {
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null)

  const handleHarvest = () => {
    if (selectedCropId !== null) {
      onHarvest(selectedCropId)
      setSelectedCropId(null)
    }
  }

  const calculateDaysToHarvest = (expectedHarvest: string): number => {
    const today = new Date()
    const harvestDate = new Date(expectedHarvest)
    const diffTime = Math.abs(harvestDate.getTime() - today.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-primary">Transplanted Crops</CardTitle>
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
              <TableHead>Transplant Date</TableHead>
              <TableHead>Expected Harvest</TableHead>
              <TableHead>Days to Harvest</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...transplantedCrops].reverse().map((crop) => (
              <TableRow key={crop.id}>
                <TableCell>{crop.name}</TableCell>
                <TableCell>{crop.variety}</TableCell>
                <TableCell>{crop.subvariety}</TableCell>
                <TableCell>{crop.field}</TableCell>
                <TableCell>{crop.quantity}</TableCell>
                <TableCell>{crop.transplantDate}</TableCell>
                <TableCell>{crop.expectedHarvest}</TableCell>
                <TableCell>{calculateDaysToHarvest(crop.expectedHarvest)}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedCropId(crop.id)}
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        Harvest
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Harvest Crop</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p>Are you sure you want to harvest this crop?</p>
                        <Button
                          onClick={handleHarvest}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Confirm Harvest
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

