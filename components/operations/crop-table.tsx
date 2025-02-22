import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Crop {
  id: number
  name: string
  variety: string
  subvariety: string
  field: string
  plantingDate: string
  expectedHarvest: string
  status: string
}

interface CropTableProps {
  crops: Crop[]
  onTransplant: (id: number) => void
  onHarvest: (id: number) => void
}

export function CropTable({ crops, onTransplant, onHarvest }: CropTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Crop Name</TableHead>
          <TableHead>Variety</TableHead>
          <TableHead>Subvariety</TableHead>
          <TableHead>Field</TableHead>
          <TableHead>Planting Date</TableHead>
          <TableHead>Expected Harvest</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {crops.map((crop) => (
          <TableRow key={crop.id}>
            <TableCell>{crop.name}</TableCell>
            <TableCell>{crop.variety}</TableCell>
            <TableCell>{crop.subvariety}</TableCell>
            <TableCell>{crop.field}</TableCell>
            <TableCell>{crop.plantingDate}</TableCell>
            <TableCell>{crop.expectedHarvest}</TableCell>
            <TableCell>{crop.status}</TableCell>
            <TableCell>
              {crop.status === "Seeded" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Transplant</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Transplant Crop</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p>Are you sure you want to transplant this crop?</p>
                      <Button
                        onClick={() => onTransplant(crop.id)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Confirm Transplant
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {crop.status === "Transplanted" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Harvest</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Harvest Crop</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p>Are you sure you want to harvest this crop?</p>
                      <Button
                        onClick={() => onHarvest(crop.id)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Confirm Harvest
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

