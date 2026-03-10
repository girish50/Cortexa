"use client"

import { useState, useEffect } from "react"
import { ActionTabs } from "@/components/action-tabs"
import { ActionCard } from "@/components/action-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, BellOff, Vibrate, Volume2, VolumeX, Settings, RefreshCw } from "lucide-react"

interface ActionCenterProps {
  onScreenChange: (screen: string) => void
}

interface Action {
  id: string
  title: string
  description: string
  severity: "critical" | "warning" | "info"
  machine: string
  timestamp: string
  details: string
  vibrationEnabled?: boolean
  soundEnabled?: boolean
  isNew?: boolean
}

interface AlertSettings {
  notifications: boolean
  vibration: boolean
  sound: boolean
  autoRefresh: boolean
}

export function ActionCenter({ onScreenChange }: ActionCenterProps) {
  const [activeTab, setActiveTab] = useState("critical")
  const [actions, setActions] = useState<Action[]>([])
  const [loading, setLoading] = useState(true)
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    notifications: true,
    vibration: true,
    sound: true,
    autoRefresh: true,
  })

  useEffect(() => {
    loadSampleData()
  }, [])

  const loadSampleData = () => {
    setLoading(true)
    setTimeout(() => {
      setActions(sampleActions)
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (!alertSettings.autoRefresh) return

    const interval = setInterval(() => {
      loadSampleData()
    }, 30000)

    return () => clearInterval(interval)
  }, [alertSettings.autoRefresh])

  const triggerAlertVibration = (severity: string) => {
    if (!alertSettings.vibration || !navigator.vibrate) return

    const patterns = {
      critical: [300, 100, 300, 100, 300],
      warning: [200, 50, 200],
      info: [100],
    }

    navigator.vibrate(patterns[severity as keyof typeof patterns] || patterns.info)
  }

  const playAlertSound = (severity: string) => {
    if (!alertSettings.sound) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    const frequencies = {
      critical: 800,
      warning: 600,
      info: 400,
    }

    oscillator.frequency.setValueAtTime(
      frequencies[severity as keyof typeof frequencies] || 400,
      audioContext.currentTime,
    )
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const handleSettingChange = (setting: keyof AlertSettings, value: boolean) => {
    const newSettings = { ...alertSettings, [setting]: value }
    setAlertSettings(newSettings)
  }

  const tabs = [
    {
      id: "critical",
      label: "Critical",
      count: actions.filter((a) => a.severity === "critical").length,
      color: "red",
    },
    {
      id: "warning",
      label: "Warning",
      count: actions.filter((a) => a.severity === "warning").length,
      color: "yellow",
    },
    {
      id: "info",
      label: "Info",
      count: actions.filter((a) => a.severity === "info").length,
      color: "green",
    },
  ]

  const filteredActions = actions.filter((action) => action.severity === activeTab)

  const handleViewMachine = (machineId: string) => {
    onScreenChange("machines")
  }

  const handleMarkResolved = async (actionId: string) => {
    setActions(actions.filter((action) => action.id !== actionId))
  }

  const testVibration = () => {
    triggerAlertVibration("critical")
  }

  const testSound = () => {
    playAlertSound("critical")
  }

  const sampleActions: Action[] = [
    {
      id: "1",
      title: "Bearing Failure Predicted",
      description:
        "Digital Twin AI detected abnormal vibration patterns indicating potential bearing failure in 7 days.",
      severity: "critical",
      machine: "Cutting Machine #3",
      timestamp: "2 hours ago",
      details:
        "Our predictive model has identified a 12% increase in energy consumption patterns consistent with early-stage bearing wear. Immediate maintenance is recommended to prevent costly downtime and potential equipment damage.",
      vibrationEnabled: true,
      soundEnabled: true,
      isNew: true,
    },
    {
      id: "2",
      title: "High Energy Consumption",
      description: "Machine operating 15% above normal energy baseline for the past 4 hours.",
      severity: "critical",
      machine: "Press Machine #1",
      timestamp: "4 hours ago",
      details:
        "Energy consumption has spiked to 2.3 MW, significantly above the normal 2.0 MW baseline. This could indicate mechanical issues or inefficient operation parameters.",
      vibrationEnabled: true,
      soundEnabled: true,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Action Center</h1>
        <p className="text-muted-foreground">Smart alerts with user-controlled notifications</p>
      </div>

      <Card className="p-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Alert Settings</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadSampleData}
              disabled={loading}
              className="gap-2 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {alertSettings.notifications ? (
                <Bell className="h-4 w-4 text-green-500" />
              ) : (
                <BellOff className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-sm">Notifications</span>
            </div>
            <Switch
              checked={alertSettings.notifications}
              onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Vibrate className={`h-4 w-4 ${alertSettings.vibration ? "text-blue-500" : "text-muted-foreground"}`} />
              <span className="text-sm">Vibration</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={alertSettings.vibration}
                onCheckedChange={(checked) => handleSettingChange("vibration", checked)}
              />
              <Button variant="ghost" size="sm" onClick={testVibration} className="h-6 w-6 p-0">
                <span className="text-xs">Test</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {alertSettings.sound ? (
                <Volume2 className="h-4 w-4 text-purple-500" />
              ) : (
                <VolumeX className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-sm">Sound</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={alertSettings.sound}
                onCheckedChange={(checked) => handleSettingChange("sound", checked)}
              />
              <Button variant="ghost" size="sm" onClick={testSound} className="h-6 w-6 p-0">
                <span className="text-xs">Test</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw
                className={`h-4 w-4 ${alertSettings.autoRefresh ? "text-green-500" : "text-muted-foreground"}`}
              />
              <span className="text-sm">Auto Refresh</span>
            </div>
            <Switch
              checked={alertSettings.autoRefresh}
              onCheckedChange={(checked) => handleSettingChange("autoRefresh", checked)}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        <ActionTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <div className="text-muted-foreground">Loading alerts...</div>
          </div>
        ) : filteredActions.length > 0 ? (
          filteredActions.map((action) => (
            <div key={action.id} className="relative">
              <ActionCard
                id={action.id}
                title={action.title}
                description={action.description}
                severity={action.severity}
                machine={action.machine}
                timestamp={action.timestamp}
                details={action.details}
                onViewMachine={handleViewMachine}
                onMarkResolved={handleMarkResolved}
              />
              {action.isNew && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white animate-pulse">NEW</Badge>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                {action.vibrationEnabled && (
                  <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-300">
                    <Vibrate className="h-3 w-3 mr-1" />
                    Vibration
                  </Badge>
                )}
                {action.soundEnabled && (
                  <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800 border-purple-300">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Sound
                  </Badge>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-2">No {activeTab} actions at this time</div>
            <div className="text-sm text-muted-foreground">All systems are operating normally</div>
          </div>
        )}
      </div>

      <Card className="p-6 max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-foreground mb-4">Action Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">
              {actions.filter((a) => a.severity === "critical").length}
            </div>
            <div className="text-sm text-muted-foreground">Critical Issues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {actions.filter((a) => a.severity === "warning").length}
            </div>
            <div className="text-sm text-muted-foreground">Warning Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{actions.filter((a) => a.severity === "info").length}</div>
            <div className="text-sm text-muted-foreground">Information Updates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{actions.filter((a) => a.isNew).length}</div>
            <div className="text-sm text-muted-foreground">New Alerts</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
