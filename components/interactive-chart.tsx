"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartDataPoint {
  time: string;
  cost: number;
  energy: number;
  originalCost?: number;
  originalEnergy?: number;
}

interface InteractiveChartProps {
  data: ChartDataPoint[];
  isSimulationMode?: boolean;
}

export function InteractiveChart({
  data,
  isSimulationMode = false,
}: InteractiveChartProps) {
  const [zoomDomain, setZoomDomain] = useState<[number, number] | null>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => {
            if (
              entry.dataKey === "originalCost" ||
              entry.dataKey === "originalEnergy"
            )
              return null;
            return (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {`${entry.dataKey.includes("cost") ? "Cost: ₹" : "Energy: "}${entry.value}${
                  entry.dataKey.includes("energy") ? " kWh" : ""
                }`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {isSimulationMode ? "Simulation Results" : "Energy & Cost Analysis"}
        </h3>
        {isSimulationMode && (
          <div className="text-sm text-accent font-medium">SIMULATION MODE</div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9ca3af" />
          <YAxis yAxisId="cost" orientation="left" stroke="#ffd700" />
          <YAxis yAxisId="energy" orientation="right" stroke="#e75480" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            yAxisId="cost"
            type="monotone"
            dataKey="cost"
            stroke="#ffd700"
            strokeWidth={2}
            dot={{ fill: "#ffd700", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#ffd700", strokeWidth: 2 }}
            name="Cost (₹)"
          />
          <Line
            yAxisId="energy"
            type="monotone"
            dataKey="energy"
            stroke="#e75480"
            strokeWidth={2}
            dot={{ fill: "#e75480", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#e75480", strokeWidth: 2 }}
            name="Energy (kWh)"
          />
          {isSimulationMode && (
            <>
              <Line
                yAxisId="cost"
                type="monotone"
                dataKey="originalCost"
                stroke="#ffd700"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={false}
                name="Original Cost (₹)"
                opacity={0.5}
              />
              <Line
                yAxisId="energy"
                type="monotone"
                dataKey="originalEnergy"
                stroke="#e75480"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={false}
                name="Original Energy (kWh)"
                opacity={0.5}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-muted-foreground">
        Tip: Hover over data points for detailed information. Pinch to zoom on
        mobile devices.
      </div>
    </div>
  );
}
