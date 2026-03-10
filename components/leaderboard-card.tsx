"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, TrendingDown } from "lucide-react"

interface LeaderboardCardProps {
  rank: number
  name: string
  team: string
  score: number
  change: number
  isCurrentUser?: boolean
  animationDelay?: number
}

export function LeaderboardCard({
  rank,
  name,
  team,
  score,
  change,
  isCurrentUser = false,
  animationDelay = 0,
}: LeaderboardCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, animationDelay)

    return () => clearTimeout(timer)
  }, [animationDelay])

  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-secondary" />
      case 2:
        return <Medal className="h-5 w-5 text-muted-foreground" />
      case 3:
        return <Award className="h-5 w-5 text-accent" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getChangeIcon = () => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-primary" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-destructive" />
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card
      className={`p-4 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${isCurrentUser ? "border-primary bg-primary/5" : ""}`}
    >
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="flex-shrink-0 w-8 flex justify-center">{getRankIcon()}</div>

        {/* Avatar */}
        <Avatar className="h-10 w-10">
          <AvatarFallback className={isCurrentUser ? "bg-primary text-primary-foreground" : ""}>
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${isCurrentUser ? "text-primary" : "text-foreground"}`}>{name}</h3>
            {isCurrentUser && (
              <Badge variant="secondary" className="text-xs">
                You
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{team}</p>
        </div>

        {/* Score and Change */}
        <div className="text-right">
          <div className="text-lg font-bold text-foreground">{score.toLocaleString()}</div>
          {change !== 0 && (
            <div className="flex items-center gap-1 justify-end">
              {getChangeIcon()}
              <span className={`text-xs ${change > 0 ? "text-primary" : "text-destructive"}`}>
                {change > 0 ? "+" : ""}
                {change}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
