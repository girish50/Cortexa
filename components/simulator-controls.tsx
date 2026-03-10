"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Wand2, RotateCcw, TrendingUp } from "lucide-react"

interface SimulatorControlsProps {
  onRunSimulation: (params: SimulationParams) => void
  onReset: () => void
}

export interface SimulationParams {
  energyReduction: number
  maintenanceFrequency: number
  operatingHours: number
}

export function SimulatorControls({ onRunSimulation, onReset }: SimulatorControlsProps) {
  const [energyReduction, setEnergyReduction] = useState([10])
  const [maintenanceFrequency, setMaintenanceFrequency] = useState([30])
  const [operatingHours, setOperatingHours] = useState([16])

  const handleRunSimulation = () => {
    onRunSimulation({
      energyReduction: energyReduction[0],
      maintenanceFrequency: maintenanceFrequency[0],
      operatingHours: operatingHours[0],
    })
  }

  const calculateSavings = () => {
    const baseCost = 25000 // Base daily cost in rupees
    const energySavings = (baseCost * energyReduction[0]) / 100
    const maintenanceSavings = Math.max(0, (30 - maintenanceFrequency[0]) * 500)
    const operationSavings = Math.max(0, (24 - operatingHours[0]) * 800)
    return energySavings + maintenanceSavings + operationSavings
  }

  const estimatedSavings = calculateSavings()

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          What-If Simulator
        </h3>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Energy Reduction Target: {energyReduction[0]}%
          </label>
          <Slider
            value={energyReduction}
            onValueChange={setEnergyReduction}
            max={50}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground mt-1">
            Potential daily savings: ₹{Math.round((25000 * energyReduction[0]) / 100).toLocaleString()}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Maintenance Frequency: Every {maintenanceFrequency[0]} days
          </label>
          <Slider
            value={maintenanceFrequency}
            onValueChange={setMaintenanceFrequency}
            max={90}
            min={7}
            step={7}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground mt-1">
            {maintenanceFrequency[0] < 30 ? "More frequent maintenance" : "Standard maintenance schedule"}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Daily Operating Hours: {operatingHours[0]}h
          </label>
          <Slider
            value={operatingHours}
            onValueChange={setOperatingHours}
            max={24}
            min={8}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground mt-1">
            {operatingHours[0] < 16 ? "Reduced operation hours" : "Extended operation hours"}
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Estimated Impact</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Daily Savings:</span>
              <span className="text-foreground font-medium">₹{Math.round(estimatedSavings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Projection:</span>
              <span className="text-primary font-medium">₹{Math.round(estimatedSavings * 30).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Annual Projection:</span>
              <span className="text-secondary font-medium">₹{Math.round(estimatedSavings * 365).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Button onClick={handleRunSimulation} className="w-full">
          <Wand2 className="h-4 w-4 mr-2" />
          Run Simulation
        </Button>
      </div>
    </Card>
  )
}
