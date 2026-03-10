"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Activity, BarChart3, AlertTriangle, Cpu, MessageSquare, Users, X } from "lucide-react"

interface NavigationDrawerProps {
  isOpen: boolean
  onClose: () => void
  activeScreen: string
  onScreenChange: (screen: string) => void
}

const navigationItems = [
  { id: "command-center", label: "Command Center", icon: Activity },
  { id: "analytics", label: "Analytics Hub", icon: BarChart3 },
  { id: "action-center", label: "Action Center", icon: AlertTriangle },
  { id: "machines", label: "Machines", icon: Cpu },
  { id: "ai-assistant", label: "AI Assistant", icon: MessageSquare },
  { id: "team", label: "My Team", icon: Users },
]

export function NavigationDrawer({ isOpen, onClose, activeScreen, onScreenChange }: NavigationDrawerProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Drawer */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sidebar-foreground hover:bg-sidebar-accent/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeScreen === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-left",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/20",
                )}
                onClick={() => {
                  onScreenChange(item.id)
                  onClose()
                }}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>
    </>
  )
}
