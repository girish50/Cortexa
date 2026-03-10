"use client"

import { useState, useEffect } from "react"
import { Menu, User, Bell, Zap, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  onMenuClick: () => void
  onProfileClick: () => void
}

export function AppHeader({ onMenuClick, onProfileClick }: AppHeaderProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [notifications, setNotifications] = useState(3)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-foreground hover:bg-muted">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="relative h-6 w-6 bg-primary rounded flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cortexa
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            {isOnline ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
            <span className="text-xs text-muted-foreground hidden sm:block">{isOnline ? "Online" : "Offline"}</span>
          </div>

          {/* Current Time */}
          <div className="text-xs text-muted-foreground hidden md:block">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-muted relative"
            onClick={() => setNotifications(0)}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white shadow-sm">
                {notifications > 9 ? "9+" : notifications}
              </div>
            )}
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon" onClick={onProfileClick} className="text-foreground hover:bg-muted">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="bg-primary/5 border-t border-primary/10 px-4 py-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium">System Status:</span>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span className="text-foreground font-medium">All Systems Operational</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-foreground font-medium">
            <span>24 Machines Active</span>
            <span>•</span>
            <span>₹18,450 Daily Cost</span>
            <span>•</span>
            <span>94.2% Efficiency</span>
          </div>
        </div>
      </div>
    </header>
  )
}
