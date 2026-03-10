"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface HeartbeatChartProps {
  isLive?: boolean
}

export function HeartbeatChart({ isLive = true }: HeartbeatChartProps) {
  const [data, setData] = useState<{ time: number; value: number }[]>([])

  useEffect(() => {
    // Initialize with some data points
    const initialData = Array.from({ length: 50 }, (_, i) => ({
      time: i,
      value: 50 + Math.sin(i * 0.1) * 20 + Math.random() * 10,
    }))
    setData(initialData)

    if (!isLive) return

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        const lastTime = newData.length > 0 ? newData[newData.length - 1].time : 0
        newData.push({
          time: lastTime + 1,
          value: 50 + Math.sin(lastTime * 0.1) * 20 + Math.random() * 10,
        })
        return newData
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <div className="bg-card rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Real-time Energy Heartbeat</h3>
        {isLive && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary font-medium">LIVE</span>
          </div>
        )}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#36b5a2"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
