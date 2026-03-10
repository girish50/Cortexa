"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, User, Bell, Zap, Wifi, WifiOff, LogOut, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  onMenuClick: () => void
  onProfileClick: () => void
  onLogout: () => void
}

export function AppHeader({ onMenuClick, onProfileClick, onLogout }: AppHeaderProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [notifications, setNotifications] = useState(3)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [profileOpen, setProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
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
            <h1 className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
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
            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
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

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted flex items-center gap-1"
              onClick={() => setProfileOpen((prev) => !prev)}
            >
              <User className="h-5 w-5" />
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
            </Button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Profile info */}
                <div className="px-4 py-3 border-b border-border bg-muted/40">
                  <p className="text-sm font-semibold text-foreground">Admin</p>
                  <p className="text-xs text-muted-foreground">admin@cortexa.ai</p>
                </div>

                {/* View Profile */}
                <button
                  onClick={() => { onProfileClick(); setProfileOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  View Profile
                </button>

                {/* Logout */}
                <button
                  onClick={() => { onLogout(); setProfileOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-border"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            )}
          </div>
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
