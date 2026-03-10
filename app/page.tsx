"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { LoginScreen } from "@/components/login-screen"
import { CommandCenter } from "@/components/screens/command-center"
import { AnalyticsHub } from "@/components/screens/analytics-hub"
import { ActionCenter } from "@/components/screens/action-center"
import { Machines } from "@/components/screens/machines"
import { AIAssistant } from "@/components/screens/ai-assistant"
import { Team } from "@/components/screens/team"

function CommandCenterScreen({ onScreenChange }: { onScreenChange: (screen: string) => void }) {
  return <CommandCenter onScreenChange={onScreenChange} />
}

function ActionCenterScreen({ onScreenChange }: { onScreenChange: (screen: string) => void }) {
  return <ActionCenter onScreenChange={onScreenChange} />
}

function AnalyticsHubScreen() {
  return <AnalyticsHub />
}

function MachinesScreen() {
  return <Machines />
}

function AIAssistantScreen() {
  return <AIAssistant />
}

function TeamScreen() {
  return <Team />
}

export default function Home() {
  const [activeScreen, setActiveScreen] = useState("command-center")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [screenHistory, setScreenHistory] = useState<string[]>(["command-center"])

  const handleScreenChange = (screen: string) => {
    if (screen === activeScreen) return

    setIsLoading(true)

    // Simulate screen transition delay for smooth UX
    setTimeout(() => {
      setActiveScreen(screen)
      setScreenHistory((prev) => {
        const newHistory = prev.filter((s) => s !== screen)
        return [screen, ...newHistory].slice(0, 5) // Keep last 5 screens
      })
      setIsLoading(false)
    }, 150)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isAuthenticated || e.ctrlKey || e.metaKey || e.altKey) return

      switch (e.key) {
        case "1":
          handleScreenChange("command-center")
          break
        case "2":
          handleScreenChange("analytics")
          break
        case "3":
          handleScreenChange("action-center")
          break
        case "4":
          handleScreenChange("machines")
          break
        case "5":
          handleScreenChange("ai-assistant")
          break
        case "6":
          handleScreenChange("team")
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isAuthenticated])

  useEffect(() => {
    const savedAuth = localStorage.getItem("cortexa-auth")
    const savedScreen = localStorage.getItem("cortexa-active-screen")

    if (savedAuth === "true") {
      setIsAuthenticated(true)
    }
    if (savedScreen && savedAuth === "true") {
      setActiveScreen(savedScreen)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem("cortexa-auth", "true")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("cortexa-auth")
    localStorage.removeItem("cortexa-active-screen")
    setActiveScreen("command-center")
  }

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("cortexa-active-screen", activeScreen)
    }
  }, [activeScreen, isAuthenticated])

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case "command-center":
        return <CommandCenterScreen onScreenChange={handleScreenChange} />
      case "analytics":
        return <AnalyticsHubScreen />
      case "action-center":
        return <ActionCenterScreen onScreenChange={handleScreenChange} />
      case "machines":
        return <MachinesScreen />
      case "ai-assistant":
        return <AIAssistantScreen />
      case "team":
        return <TeamScreen />
      default:
        return <CommandCenterScreen onScreenChange={handleScreenChange} />
    }
  }

  return (
    <AppLayout activeScreen={activeScreen} onScreenChange={handleScreenChange}>
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-foreground font-medium">Loading...</span>
          </div>
        </div>
      )}

      <div className={`transition-opacity duration-150 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {renderScreen()}
      </div>

      <div className="fixed bottom-4 right-4 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <div className="space-y-1">
          <div>Press 1-6 for quick navigation</div>
          <div>1: Command • 2: Analytics • 3: Actions</div>
          <div>4: Machines • 5: AI • 6: Team</div>
        </div>
      </div>
    </AppLayout>
  )
}
