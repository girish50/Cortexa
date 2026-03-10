"use client"

import { Card } from "@/components/ui/card"
import { HealthGauge } from "@/components/health-gauge"
import { Badge } from "@/components/ui/badge"
import { Cpu, Zap, Clock } from "lucide-react"

interface MachineCardProps {
  id: string
  name: string
  type: string
  healthScore: number
  status: "online" | "offline" | "maintenance"
  energyUsage: string
  lastMaintenance: string
  onClick: () => void
}

export function MachineCard({
  id,
  name,
  type,
  healthScore,
  status,
  energyUsage,
  lastMaintenance,
  onClick,
}: MachineCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-primary text-primary-foreground"
      case "offline":
        return "bg-destructive text-destructive-foreground"
      case "maintenance":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusDot = () => {
    switch (status) {
      case "online":
        return "bg-primary"
      case "offline":
        return "bg-destructive"
      case "maintenance":
        return "bg-secondary"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card
      className="p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-muted rounded-lg">
            <Cpu className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusDot()}`} />
          <Badge variant="secondary" className={getStatusColor()}>
            {status.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">Energy:</span>
              <span className="text-foreground font-medium">{energyUsage}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Last Service:</span>
              <span className="text-foreground">{lastMaintenance}</span>
            </div>
          </div>
        </div>
        <div className="ml-4">
          <HealthGauge value={healthScore} size="sm" animated={false} />
        </div>
      </div>
    </Card>
  )
}
