"use client"

import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"

interface KpiCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  onClick?: () => void
  variant?: "default" | "critical"
  trend?: string
}

export function KpiCard({ title, value, icon: Icon, onClick, variant = "default", trend }: KpiCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden ${
        variant === "critical" ? "border-destructive/50 bg-destructive/5" : "hover:border-primary/50"
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${
          variant === "critical"
            ? "from-destructive/10 to-destructive/5 opacity-100"
            : isHovered
              ? "from-primary/10 to-accent/5 opacity-100"
              : "opacity-0"
        }`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p
              className={`text-2xl font-bold transition-colors duration-200 ${
                variant === "critical" ? "text-destructive" : "text-foreground"
              }`}
            >
              {value}
            </p>
            {trend && <p className="text-xs text-muted-foreground mt-1 opacity-70">{trend}</p>}
          </div>
          <div className={`transition-all duration-300 ${isHovered ? "scale-110 rotate-12" : ""}`}>
            <Icon className={`h-8 w-8 ${variant === "critical" ? "text-destructive" : "text-primary"}`} />
          </div>
        </div>

        {variant === "critical" && (
          <div className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full animate-pulse" />
        )}
      </div>
    </Card>
  )
}
