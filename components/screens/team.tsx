"use client"

import { useState, useEffect } from "react"
import { LeaderboardCard } from "@/components/leaderboard-card"
import { AchievementBadge } from "@/components/achievement-badge"
import { UserStats } from "@/components/user-stats"
import { Card } from "@/components/ui/card"
import { Users, Award } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  team: string
  score: number
  change: number
  isCurrentUser?: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  isUnlocked: boolean
  unlockedDate?: string
  progress?: number
  maxProgress?: number
}

const leaderboardData: TeamMember[] = [
  { id: "1", name: "Sarah Chen", team: "Production Team Alpha", score: 12450, change: 150 },
  { id: "2", name: "Alex Kumar", team: "Your Team", score: 11890, change: 75, isCurrentUser: true },
  { id: "3", name: "Maria Rodriguez", team: "Maintenance Crew B", score: 11650, change: -25 },
  { id: "4", name: "David Park", team: "Quality Control", score: 11200, change: 200 },
  { id: "5", name: "Emma Thompson", team: "Production Team Beta", score: 10950, change: 50 },
  { id: "6", name: "James Wilson", team: "Energy Management", score: 10800, change: -100 },
  { id: "7", name: "Lisa Zhang", team: "Predictive Analytics", score: 10650, change: 125 },
  { id: "8", name: "Michael Brown", team: "Operations", score: 10400, change: 0 },
]

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Energy Saver",
    description: "Reduced energy consumption by 10% in a single month",
    icon: "zap",
    isUnlocked: true,
    unlockedDate: "Dec 2024",
  },
  {
    id: "2",
    title: "Alert Master",
    description: "Resolved 50 critical alerts without downtime",
    icon: "target",
    isUnlocked: true,
    unlockedDate: "Nov 2024",
  },
  {
    id: "3",
    title: "Efficiency Expert",
    description: "Maintained 95%+ efficiency for 30 consecutive days",
    icon: "trending",
    isUnlocked: true,
    unlockedDate: "Oct 2024",
  },
  {
    id: "4",
    title: "Predictive Pro",
    description: "Successfully predicted and prevented 10 machine failures",
    icon: "shield",
    isUnlocked: false,
    progress: 7,
    maxProgress: 10,
  },
  {
    id: "5",
    title: "Team Player",
    description: "Collaborated on 25 cross-team optimization projects",
    icon: "star",
    isUnlocked: false,
    progress: 18,
    maxProgress: 25,
  },
  {
    id: "6",
    title: "Innovation Leader",
    description: "Implemented 5 AI-driven process improvements",
    icon: "award",
    isUnlocked: false,
    progress: 3,
    maxProgress: 5,
  },
]

export function Team() {
  const [showConfetti, setShowConfetti] = useState(false)

  // Check for newly unlocked badges (simulated)
  useEffect(() => {
    const hasNewBadge = achievements.some((a) => a.isUnlocked && a.unlockedDate === "Dec 2024")
    if (hasNewBadge) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [])

  return (
    <div className="p-6 space-y-8">
      {/* Confetti Effect for New Badges */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse" />
          {/* Simple confetti simulation with CSS */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Team</h1>
        <p className="text-muted-foreground">Performance rankings and achievements</p>
      </div>

      {/* User Stats */}
      <UserStats energySaved={2450} alertsResolved={23} uptime={99.2} efficiency={94.7} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leaderboard */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Team Leaderboard</h2>
          </div>

          <div className="space-y-3">
            {leaderboardData.map((member, index) => (
              <LeaderboardCard
                key={member.id}
                rank={index + 1}
                name={member.name}
                team={member.team}
                score={member.score}
                change={member.change}
                isCurrentUser={member.isCurrentUser}
                animationDelay={index * 100}
              />
            ))}
          </div>

          {/* Team Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Team Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2nd</div>
                <div className="text-sm text-muted-foreground">Your Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">+75</div>
                <div className="text-sm text-muted-foreground">Points This Week</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-secondary" />
            <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <AchievementBadge key={achievement.id} {...achievement} />
            ))}
          </div>

          {/* Achievement Progress */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Progress Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Badges Unlocked</span>
                <span className="text-foreground font-medium">
                  {achievements.filter((a) => a.isUnlocked).length}/{achievements.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Badge</span>
                <span className="text-primary font-medium">Predictive Pro (70%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Score</span>
                <span className="text-foreground font-medium">11,890 pts</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
