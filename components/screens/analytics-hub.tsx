"use client"

import { useState } from "react"
import { FilterButtons } from "@/components/filter-buttons"
import { InteractiveChart } from "@/components/interactive-chart"
import { SimulatorControls, type SimulationParams } from "@/components/simulator-controls"
import { Button } from "@/components/ui/button"
import { Wand2, BarChart3 } from "lucide-react"

// Sample data for different time periods
const generateData = (period: string) => {
  const baseData = {
    Daily: [
      { time: "00:00", cost: 1200, energy: 180 },
      { time: "04:00", cost: 800, energy: 120 },
      { time: "08:00", cost: 2200, energy: 320 },
      { time: "12:00", cost: 2800, energy: 400 },
      { time: "16:00", cost: 3200, energy: 450 },
      { time: "20:00", cost: 2400, energy: 350 },
    ],
    Weekly: [
      { time: "Mon", cost: 18000, energy: 2800 },
      { time: "Tue", cost: 22000, energy: 3200 },
      { time: "Wed", cost: 19500, energy: 2950 },
      { time: "Thu", cost: 21000, energy: 3100 },
      { time: "Fri", cost: 23500, energy: 3400 },
      { time: "Sat", cost: 15000, energy: 2200 },
      { time: "Sun", cost: 12000, energy: 1800 },
    ],
    Monthly: [
      { time: "Week 1", cost: 140000, energy: 21000 },
      { time: "Week 2", cost: 155000, energy: 23000 },
      { time: "Week 3", cost: 148000, energy: 22000 },
      { time: "Week 4", cost: 162000, energy: 24500 },
    ],
    Yearly: [
      { time: "Q1", cost: 1800000, energy: 270000 },
      { time: "Q2", cost: 2100000, energy: 315000 },
      { time: "Q3", cost: 1950000, energy: 292000 },
      { time: "Q4", cost: 2250000, energy: 337000 },
    ],
  }
  return baseData[period as keyof typeof baseData] || baseData.Daily
}

export function AnalyticsHub() {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily")
  const [isSimulationMode, setIsSimulationMode] = useState(false)
  const [chartData, setChartData] = useState(generateData("Daily"))

  const periods = ["Daily", "Weekly", "Monthly", "Yearly"]

  const handlePeriodChange = (period: string) => {
    if (!isSimulationMode) {
      setSelectedPeriod(period)
      setChartData(generateData(period))
    }
  }

  const handleSimulatorToggle = () => {
    setIsSimulationMode(!isSimulationMode)
    if (isSimulationMode) {
      // Exit simulation mode
      setChartData(generateData(selectedPeriod))
    }
  }

  const handleRunSimulation = (params: SimulationParams) => {
    // Generate simulated data based on parameters
    const baseData = generateData(selectedPeriod)
    const simulatedData = baseData.map((point) => ({
      ...point,
      cost: Math.round(point.cost * (1 - params.energyReduction / 100)),
      energy: Math.round(point.energy * (1 - params.energyReduction / 100)),
    }))
    setChartData(simulatedData)
  }

  const handleResetSimulation = () => {
    setChartData(generateData(selectedPeriod))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Hub</h1>
        <p className="text-muted-foreground">Data-driven insights and predictive modeling</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {!isSimulationMode && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">Time Period:</span>
            <FilterButtons options={periods} selected={selectedPeriod} onSelect={handlePeriodChange} />
          </div>
        )}

        <Button
          variant={isSimulationMode ? "destructive" : "secondary"}
          onClick={handleSimulatorToggle}
          className="flex items-center gap-2"
        >
          {isSimulationMode ? (
            <>
              <BarChart3 className="h-4 w-4" />
              Exit Simulator
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              What-If Simulator
            </>
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2">
          <InteractiveChart data={chartData} isSimulationMode={isSimulationMode} />
        </div>

        {/* Simulator Controls or Summary */}
        <div>
          {isSimulationMode ? (
            <SimulatorControls onRunSimulation={handleRunSimulation} onReset={handleResetSimulation} />
          ) : (
            <div className="bg-card rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Key Insights</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peak Usage</span>
                  <span className="text-foreground font-medium">16:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Efficiency Trend</span>
                  <span className="text-primary font-medium">↗ +2.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost Savings</span>
                  <span className="text-secondary font-medium">₹12,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Predicted Savings</span>
                  <span className="text-primary font-medium">₹45,200/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ROI This Quarter</span>
                  <span className="text-accent font-medium">₹2.8L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Maintenance Budget</span>
                  <span className="text-foreground font-medium">₹85,000 remaining</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
