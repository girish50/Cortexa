"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Bot, User } from "lucide-react"

interface ChatMessageProps {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
  isCritical?: boolean
  isNew?: boolean
}

export function ChatMessage({ id, content, sender, timestamp, isCritical = false, isNew = false }: ChatMessageProps) {
  const [isVisible, setIsVisible] = useState(!isNew)

  useEffect(() => {
    if (isNew) {
      // Trigger vibration for critical messages
      if (isCritical && "vibrate" in navigator) {
        navigator.vibrate([200, 100, 200])
      }

      // Animate in the message
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isNew, isCritical])

  const isUser = sender === "user"

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-primary" : "bg-card border border-border"
          }`}
        >
          {isUser ? <User className="h-4 w-4 text-primary-foreground" /> : <Bot className="h-4 w-4 text-foreground" />}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
          <Card
            className={`p-3 ${
              isUser
                ? "bg-primary text-primary-foreground"
                : isCritical
                  ? "bg-card border-destructive border-2"
                  : "bg-card"
            }`}
          >
            {/* Critical Alert Indicator */}
            {isCritical && !isUser && (
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-destructive" />
                <Badge variant="destructive" className="text-xs">
                  CRITICAL ALERT
                </Badge>
              </div>
            )}

            <p className={`text-sm ${isUser ? "text-primary-foreground" : "text-foreground"}`}>{content}</p>
          </Card>

          <span className="text-xs text-muted-foreground mt-1 px-1">{timestamp}</span>
        </div>
      </div>
    </div>
  )
}
