"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CropTable } from "./crop-table"
import { SeedingForm } from "./seeding-form"
import { TransplantForm } from "./transplant-form"
import { HarvestForm } from "./harvest-form"

export function CropManagement() {
  const [crops, setCrops] = useState<
    Array<{
      id: number
      name: string
      variety: string
      subvariety: string
      field: string
      plantingDate: string
      transplantDate: string
      harvestDate: string
      status: string
      expectedHarvest: string
      quantity: string
    }>
  >([
    {
      id: 1,
      name: "Corn",
      variety: "Sweet Corn",
      subvariety: "Golden Bantam",
      field: "Field A",
      plantingDate: "2023-03-15",
      transplantDate: "2023-04-01",
      harvestDate: "2023-09-15",
      status: "Growing",
      expectedHarvest: "2023-09-15",
      quantity: "1000",
    },
    {
      id: 2,
      name: "Wheat",
      variety: "Hard Red",
      subvariety: "Winter Wheat",
      field: "Field B",
      plantingDate: "2023-04-01",
      transplantDate: "2023-04-15",
      harvestDate: "2023-08-30",
      status: "Ready for Harvest",
      expectedHarvest: "2023-08-30",
      quantity: "2000",
    },
    {
      id: 3,
      name: "Soybeans",
      variety: "Roundup Ready",
      subvariety: "Group 3",
      field: "Field C",
      plantingDate: "2023-05-01",
      transplantDate: "2023-05-15",
      harvestDate: "2023-10-15",
      status: "Growing",
      expectedHarvest: "2023-10-15",
      quantity: "1500",
    },
    {
      id: 4,
      name: "Tomatoes",
      variety: "Beefsteak",
      subvariety: "Brandywine",
      field: "Greenhouse 1",
      plantingDate: "2023-02-15",
      transplantDate: "2023-03-01",
      harvestDate: "2023-06-30",
      status: "Harvested",
      expectedHarvest: "2023-06-30",
      quantity: "500",
    },
  ])

  const addCrop = (crop: {
    name: string
    variety: string
    subvariety: string
    quantity: string
    plantingDate: string
  }) => {
    const newCrop = {
      ...crop,
      id: crops.length + 1,
      status: "Seeded",
      field: "", // Add an empty field
      transplantDate: "", // Add an empty transplant date
      harvestDate: "", // Add an empty harvest date
      expectedHarvest: "", // Add an empty expected harvest date
    }
    setCrops([newCrop, ...crops])
  }

  const updateCropStatus = (
    id: number,
    status: string,
    field: string | null = null,
    expectedHarvest: string | null = null,
  ) => {
    setCrops(
      crops.map((crop) =>
        crop.id === id
          ? {
              ...crop,
              status,
              ...(field && { field }),
              ...(expectedHarvest && { expectedHarvest }),
              ...(status === "Transplanted" && { transplantDate: new Date().toISOString().split("T")[0] }),
              ...(status === "Harvested" && { harvestDate: new Date().toISOString().split("T")[0] }),
            }
          : crop,
      ),
    )
  }

  const seededCrops = crops.filter((crop) => crop.status === "Seeded")
  const transplantedCrops = crops.filter((crop) => crop.status === "Transplanted")
  const harvestedCrops = crops.filter((crop) => crop.status === "Harvested")

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-primary">Crop Management</CardTitle>
        <CardDescription className="text-secondary">
          Manage your crops, seeding, transplanting, and harvesting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crops" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger
              value="crops"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Crops
            </TabsTrigger>
            <TabsTrigger
              value="seeding"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Seeding
            </TabsTrigger>
            <TabsTrigger
              value="transplanting"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Transplanting
            </TabsTrigger>
            <TabsTrigger
              value="harvesting"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Harvesting
            </TabsTrigger>
          </TabsList>
          <TabsContent value="crops">
            <CropTable
              crops={crops}
              onTransplant={(id) => {
                const field = prompt("Enter the field for transplanting:")
                const expectedHarvest = prompt("Enter the expected harvest date:")
                if (field && expectedHarvest) {
                  updateCropStatus(id, "Transplanted", field, expectedHarvest)
                }
              }}
              onHarvest={(id) => updateCropStatus(id, "Harvested")}
            />
          </TabsContent>
          <TabsContent value="seeding">
            <SeedingForm onSubmit={addCrop} seededCrops={seededCrops} onTransplant={updateCropStatus} />
          </TabsContent>
          <TabsContent value="transplanting">
            <TransplantForm
              transplantedCrops={transplantedCrops}
              onHarvest={(id) => updateCropStatus(id, "Harvested")}
            />
          </TabsContent>
          <TabsContent value="harvesting">
            <HarvestForm harvestedCrops={harvestedCrops} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

