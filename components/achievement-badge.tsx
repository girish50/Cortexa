"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, Clock, TrendingUp, Shield, Star, Award, Cpu } from "lucide-react"

interface AchievementBadgeProps {
  id: string
  title: string
  description: string
  icon: string
  isUnlocked: boolean
  unlockedDate?: string
  progress?: number
  maxProgress?: number
}

const iconMap = {
  zap: Zap,
  target: Target,
  clock: Clock,
  trending: TrendingUp,
  shield: Shield,
  star: Star,
  award: Award,
  cpu: Cpu,
}

export function AchievementBadge({
  id,
  title,
  description,
  icon,
  isUnlocked,
  unlockedDate,
  progress = 0,
  maxProgress = 100,
}: AchievementBadgeProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Star

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="relative h-32 w-full cursor-pointer" onClick={handleClick}>
      <div
        className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <Card
          className={`absolute inset-0 p-4 flex flex-col items-center justify-center text-center backface-hidden ${
            isUnlocked ? "bg-primary/10 border-primary" : "bg-muted/50 grayscale opacity-60"
          }`}
        >
          <div className={`p-3 rounded-full mb-2 ${isUnlocked ? "bg-primary/20" : "bg-muted"}`}>
            <IconComponent className={`h-6 w-6 ${isUnlocked ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <h4 className={`font-medium text-sm ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>{title}</h4>
          {isUnlocked && unlockedDate && (
            <Badge variant="secondary" className="text-xs mt-1">
              {unlockedDate}
            </Badge>
          )}
          {!isUnlocked && maxProgress && (
            <div className="w-full mt-2">
              <div className="w-full bg-muted rounded-full h-1">
                <div
                  className="bg-primary h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(progress / maxProgress) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {progress}/{maxProgress}
              </span>
            </div>
          )}
        </Card>

        {/* Back Side */}
        <Card className="absolute inset-0 p-4 flex flex-col justify-center text-center backface-hidden rotate-y-180">
          <p className="text-sm text-muted-foreground">{description}</p>
          {!isUnlocked && (
            <div className="mt-2">
              <p className="text-xs text-primary font-medium">How to unlock:</p>
              <p className="text-xs text-muted-foreground mt-1">
                {progress}/{maxProgress} completed
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
