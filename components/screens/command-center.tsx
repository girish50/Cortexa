"use client"

import { HealthGauge } from "@/components/health-gauge"
import { KpiCard } from "@/components/kpi-card"
import { AlertTriangle, Zap, DollarSign, Cpu, TrendingUp, Activity } from "lucide-react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface CommandCenterProps {
  onScreenChange: (screen: string) => void
}

export function CommandCenter({ onScreenChange }: CommandCenterProps) {
  const [healthScore, setHealthScore] = useState(87)
  const [energyUsage, setEnergyUsage] = useState(2.4)
  const [dailyCost, setDailyCost] = useState(18450)
  const [activeMachines, setActiveMachines] = useState(24)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setHealthScore((prev) => Math.max(80, Math.min(95, prev + (Math.random() - 0.5) * 2)))
        setEnergyUsage((prev) => Math.max(2.0, Math.min(3.0, prev + (Math.random() - 0.5) * 0.1)))
        setDailyCost((prev) => Math.max(15000, Math.min(22000, prev + (Math.random() - 0.5) * 500)))
        setActiveMachines((prev) => Math.max(20, Math.min(28, prev + Math.floor((Math.random() - 0.5) * 2))))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const kpiData = [
    {
      title: "Critical Alerts",
      value: 3,
      icon: AlertTriangle,
      variant: "critical" as const,
      onClick: () => onScreenChange("action-center"),
      trend: "+1 from yesterday",
    },
    {
      title: "Energy Usage",
      value: `${energyUsage.toFixed(1)} MW`,
      icon: Zap,
      trend: "3% below average",
    },
    {
      title: "Daily Cost",
      value: `₹${dailyCost.toLocaleString()}`,
      icon: DollarSign,
      trend: "5% savings today",
    },
    {
      title: "Active Machines",
      value: activeMachines,
      icon: Cpu,
      trend: "2 under maintenance",
    },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header with Live Indicator */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-foreground">Command Center</h1>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
            <span className="text-sm text-muted-foreground">{isLive ? "LIVE" : "OFFLINE"}</span>
          </div>
        </div>
        <p className="text-muted-foreground">Real-time operational overview</p>
        <button onClick={() => setIsLive(!isLive)} className="mt-2 text-xs text-primary hover:underline">
          {isLive ? "Pause Live Updates" : "Resume Live Updates"}
        </button>
      </div>

      {/* Health Score - Center with pulse animation */}
      <div className="flex justify-center">
        <div className="relative">
          <HealthGauge value={healthScore} size="lg" animated={true} />
          <div
            className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"
            style={{ animationDuration: "3s" }}
          />
        </div>
      </div>

      {/* KPI Cards Grid with enhanced styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {kpiData.map((kpi, index) => (
          <div key={index} className="transform hover:scale-105 transition-transform duration-200">
            <KpiCard
              title={kpi.title}
              value={kpi.value}
              icon={kpi.icon}
              variant={kpi.variant}
              onClick={kpi.onClick}
              trend={kpi.trend}
            />
          </div>
        ))}
      </div>

      {/* Enhanced Status Summary with mini charts */}
      <div className="bg-card rounded-lg p-6 max-w-2xl mx-auto border border-border/50 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">System Status</h3>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">All Systems Operational</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
            <span className="text-muted-foreground">Overall Performance</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-1000"
                  style={{ width: `${healthScore}%` }}
                />
              </div>
              <span className="text-primary font-medium">Excellent</span>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
            <span className="text-muted-foreground">Predictive Alerts</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <span className="text-secondary font-medium">2 Pending</span>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
            <span className="text-muted-foreground">Energy Efficiency</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: "94%" }} />
              </div>
              <span className="text-primary font-medium">94.2%</span>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
            <span className="text-muted-foreground">Next Maintenance</span>
            <span className="text-foreground font-medium">In 5 days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <Card className="p-4 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl font-bold text-primary">{Math.round(healthScore)}%</div>
          <div className="text-xs text-muted-foreground">Uptime Today</div>
        </Card>
        <Card className="p-4 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl font-bold text-accent">₹2.1L</div>
          <div className="text-xs text-muted-foreground">Savings This Month</div>
        </Card>
        <Card className="p-4 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl font-bold text-primary">15</div>
          <div className="text-xs text-muted-foreground">Predictions Made</div>
        </Card>
        <Card className="p-4 text-center hover:shadow-lg transition-shadow">
          <div className="text-2xl font-bold text-green-500">99.2%</div>
          <div className="text-xs text-muted-foreground">Accuracy Rate</div>
        </Card>
      </div>
    </div>
  )
}
