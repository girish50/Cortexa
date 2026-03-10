"use client"

import { Button } from "@/components/ui/button"
import { HealthGauge } from "@/components/health-gauge"
import { HeartbeatChart } from "@/components/heartbeat-chart"
import { AIPredictionCard } from "@/components/ai-prediction-card"
import { ArrowLeft, Settings, Download } from "lucide-react"

interface Machine {
  id: string
  name: string
  type: string
  healthScore: number
  status: "online" | "offline" | "maintenance"
  energyUsage: string
  lastMaintenance: string
  location: string
  model: string
  serialNumber: string
}

interface DigitalTwinProfileProps {
  machine: Machine
  onBack: () => void
}

export function DigitalTwinProfile({ machine, onBack }: DigitalTwinProfileProps) {
  const predictions = [
    {
      title: "Bearing Condition",
      prediction: "Slight increase in vibration patterns detected. Bearing replacement recommended within 7 days.",
      confidence: 87,
      trend: "up" as const,
      severity: "high" as const,
      timeframe: "Next 7 days",
    },
    {
      title: "Energy Efficiency",
      prediction: "Operating at optimal efficiency. No immediate concerns detected.",
      confidence: 94,
      trend: "stable" as const,
      severity: "low" as const,
      timeframe: "Current",
    },
    {
      title: "Maintenance Schedule",
      prediction: "Next scheduled maintenance in 12 days. All systems within normal parameters.",
      confidence: 99,
      trend: "stable" as const,
      severity: "low" as const,
      timeframe: "12 days",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{machine.name}</h1>
          <p className="text-muted-foreground">
            {machine.type} • {machine.location}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Health Score */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6 text-center">
            <HealthGauge value={machine.healthScore} size="lg" animated={true} />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-primary font-medium">{machine.status.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Energy:</span>
                <span className="text-foreground">{machine.energyUsage}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Model:</span>
                <span className="text-foreground">{machine.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Serial:</span>
                <span className="text-foreground">{machine.serialNumber}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Uptime</span>
                <span className="text-primary font-medium">99.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Efficiency</span>
                <span className="text-primary font-medium">94.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Temperature</span>
                <span className="text-foreground">47°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vibration</span>
                <span className="text-secondary font-medium">2.3 mm/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Real-time Data */}
        <div className="space-y-6">
          <HeartbeatChart isLive={true} />

          <div className="bg-card rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Energy consumption normalized</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Vibration spike detected and resolved</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">Routine calibration completed</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - AI Predictions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">AI Predictions</h3>
          {predictions.map((prediction, index) => (
            <AIPredictionCard key={index} {...prediction} />
          ))}
        </div>
      </div>
    </div>
  )
}
