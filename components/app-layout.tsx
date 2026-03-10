"use client"

import type React from "react"

import { useState } from "react"
import { AppHeader } from "./app-header"
import { NavigationDrawer } from "./navigation-drawer"

interface AppLayoutProps {
  children: React.ReactNode
  activeScreen: string
  onScreenChange: (screen: string) => void
  onLogout: () => void
}

export function AppLayout({ children, activeScreen, onScreenChange, onLogout }: AppLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleMenuClick = () => {
    setIsDrawerOpen(true)
  }

  const handleProfileClick = () => {
    onScreenChange("team")
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader onMenuClick={handleMenuClick} onProfileClick={handleProfileClick} onLogout={onLogout} />

      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        activeScreen={activeScreen}
        onScreenChange={onScreenChange}
      />

      <main className="pt-16">{children}</main>
    </div>
  )
}
