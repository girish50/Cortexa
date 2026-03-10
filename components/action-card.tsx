"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Eye, CheckCircle } from "lucide-react"

interface ActionCardProps {
  id: string
  title: string
  description: string
  severity: "critical" | "optimization" | "info"
  machine: string
  timestamp: string
  details: string
  onViewMachine: (machineId: string) => void
  onMarkResolved: (actionId: string) => void
}

export function ActionCard({
  id,
  title,
  description,
  severity,
  machine,
  timestamp,
  details,
  onViewMachine,
  onMarkResolved,
}: ActionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getSeverityColor = () => {
    switch (severity) {
      case "critical":
        return "border-l-destructive bg-destructive/5"
      case "optimization":
        return "border-l-secondary bg-secondary/5"
      case "info":
        return "border-l-primary bg-primary/5"
      default:
        return "border-l-muted"
    }
  }

  const getSeverityTextColor = () => {
    switch (severity) {
      case "critical":
        return "text-destructive"
      case "optimization":
        return "text-secondary"
      case "info":
        return "text-primary"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card
      className={`border-l-4 ${getSeverityColor()} cursor-pointer transition-all duration-200 hover:shadow-md`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground">{title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getSeverityTextColor()} bg-current/10`}>
                {severity.toUpperCase()}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-2">{description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Machine: {machine}</span>
              <span>{timestamp}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <p className="text-sm text-foreground mb-4">{details}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  onViewMachine(machine)
                }}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Machine
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onMarkResolved(id)
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Resolved
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
