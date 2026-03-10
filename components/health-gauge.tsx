"use client"

import { useEffect, useState } from "react"

interface HealthGaugeProps {
  value: number
  size?: "sm" | "lg"
  animated?: boolean
}

export function HealthGauge({ value, size = "lg", animated = true }: HealthGaugeProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const radius = size === "lg" ? 80 : 40
  const strokeWidth = size === "lg" ? 12 : 8
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (displayValue / 100) * circumference

  useEffect(() => {
    if (animated) {
      const start = 0
      const duration = 1500
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(value * easeOut)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    } else {
      setDisplayValue(value)
    }
  }, [value, animated])

  const getColor = () => {
    if (displayValue >= 90) return "#2ecc71" // Success green
    if (displayValue >= 70) return "#36b5a2" // Primary teal
    if (displayValue >= 50) return "#f1c40f" // Warning yellow
    return "#e74c3c" // Critical red
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          stroke="#374151"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`font-bold text-foreground ${size === "lg" ? "text-4xl" : "text-xl"}`}>
            {Math.round(displayValue)}%
          </div>
          {size === "lg" && <div className="text-sm text-muted-foreground mt-1">Health Score</div>}
        </div>
      </div>
    </div>
  )
}
