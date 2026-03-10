"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Zap, Target, Clock, DollarSign } from "lucide-react"

interface UserStatsProps {
  energySaved: number
  alertsResolved: number
  uptime: number
  efficiency: number
}

export function UserStats({ energySaved, alertsResolved, uptime, efficiency }: UserStatsProps) {
  const stats = [
    {
      label: "Energy Saved",
      value: `${energySaved.toLocaleString()} kWh`,
      subValue: `₹${Math.round(energySaved * 8.5).toLocaleString()} saved`,
      icon: Zap,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      label: "Alerts Resolved",
      value: alertsResolved.toString(),
      subValue: `₹${Math.round(alertsResolved * 12000).toLocaleString()} downtime prevented`,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "System Uptime",
      value: `${uptime}%`,
      subValue: `${Math.round((uptime - 95) * 1000)} extra hours`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Efficiency Score",
      value: `${efficiency}%`,
      subValue: `₹${Math.round((efficiency - 90) * 5000).toLocaleString()} monthly bonus`,
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border-primary/20">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Total Impact This Month</h3>
          </div>
          <div className="text-3xl font-bold text-primary">
            ₹{Math.round(energySaved * 8.5 + alertsResolved * 12000 + (efficiency - 90) * 5000).toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">Cost savings and efficiency gains</p>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow duration-200">
              <div className={`inline-flex p-3 rounded-full ${stat.bgColor} mb-3`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
              <div className="text-xs text-primary font-medium">{stat.subValue}</div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
