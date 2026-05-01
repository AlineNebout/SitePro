"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export interface ProgressDataPoint {
  date: string;
  completionRate: number;
}

interface ProgressChartProps {
  data: ProgressDataPoint[];
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
}

export default function ProgressChart({ data }: ProgressChartProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            stroke="#d1fae5"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            stroke="#d1fae5"
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Complétion"]}
            labelFormatter={(label) => formatDate(String(label))}
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              border: "1px solid #d1fae5",
              borderRadius: "12px",
              fontSize: "13px",
            }}
          />
          <Line
            type="monotone"
            dataKey="completionRate"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ fill: "#10b981", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#059669", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
