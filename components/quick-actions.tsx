"use client"

import { Button } from "@/components/ui/button"
import { Zap, AlertTriangle, TrendingUp, Settings } from "lucide-react"

interface QuickActionsProps {
  onQuickAction: (action: string) => void
}

export function QuickActions({ onQuickAction }: QuickActionsProps) {
  const quickActions = [
    {
      id: "energy-status",
      label: "Energy Status",
      icon: Zap,
      query: "What's the current energy consumption across all machines?",
    },
    {
      id: "critical-alerts",
      label: "Critical Alerts",
      icon: AlertTriangle,
      query: "Show me all critical alerts and their status",
    },
    {
      id: "predictions",
      label: "AI Predictions",
      icon: TrendingUp,
      query: "What are the latest AI predictions for machine failures?",
    },
    {
      id: "optimization",
      label: "Optimization Tips",
      icon: Settings,
      query: "Give me optimization recommendations to reduce energy costs",
    },
  ]

  return (
    <div className="p-4 border-b border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              className="justify-start gap-2 h-auto p-3 bg-transparent"
              onClick={() => onQuickAction(action.query)}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{action.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
