"use client"

import { Button } from "@/components/ui/button"

interface ActionTabsProps {
  tabs: { id: string; label: string; count: number; color: string }[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function ActionTabs({ tabs, activeTab, onTabChange }: ActionTabsProps) {
  const getColorClasses = (color: string, isActive: boolean) => {
    if (!isActive) {
      return "bg-muted text-muted-foreground"
    }

    switch (color) {
      case "red":
        return "bg-red-100 text-red-800 border border-red-200"
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      case "green":
        return "bg-green-100 text-green-800 border border-green-200"
      case "blue":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200"
    }
  }

  const getActiveTabClasses = (color: string) => {
    switch (color) {
      case "red":
        return "text-red-600 border-b-2 border-red-500 bg-transparent rounded-b-none"
      case "yellow":
        return "text-yellow-600 border-b-2 border-yellow-500 bg-transparent rounded-b-none"
      case "green":
        return "text-green-600 border-b-2 border-green-500 bg-transparent rounded-b-none"
      case "blue":
        return "text-blue-600 border-b-2 border-blue-500 bg-transparent rounded-b-none"
      default:
        return "text-slate-600 border-b-2 border-slate-500 bg-transparent rounded-b-none"
    }
  }

  return (
    <div className="flex gap-1 bg-card rounded-lg p-1">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          className={`flex items-center gap-2 transition-all duration-200 ${
            activeTab === tab.id ? getActiveTabClasses(tab.color) : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(tab.color, activeTab === tab.id)}`}
          >
            {tab.count}
          </span>
        </Button>
      ))}
    </div>
  )
}
