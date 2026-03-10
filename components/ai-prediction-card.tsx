"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, CheckCircle } from "lucide-react"

interface AIPredictionCardProps {
  title: string
  prediction: string
  confidence: number
  trend: "up" | "down" | "stable"
  severity: "low" | "medium" | "high"
  timeframe: string
}

export function AIPredictionCard({ title, prediction, confidence, trend, severity, timeframe }: AIPredictionCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4" />
      case "down":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return severity === "high" ? "text-destructive" : "text-primary"
      case "down":
        return "text-accent"
      default:
        return "text-primary"
    }
  }

  const getSeverityBadge = () => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge className="bg-secondary text-secondary-foreground">Medium Priority</Badge>
      default:
        return <Badge variant="secondary">Low Priority</Badge>
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-foreground">{title}</h4>
        {getSeverityBadge()}
      </div>

      <p className="text-sm text-muted-foreground mb-3">{prediction}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={getTrendColor()}>{getTrendIcon()}</div>
          <span className="text-sm text-muted-foreground">Confidence: {confidence}%</span>
        </div>
        <span className="text-xs text-muted-foreground">{timeframe}</span>
      </div>
    </Card>
  )
}
