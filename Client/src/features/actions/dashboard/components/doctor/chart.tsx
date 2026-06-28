"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
// import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { day: "Mon", Appointment: 14 },
  { day: "Tue", Appointment: 8 },
  { day: "Wed", Appointment: 4 },
  { day: "Thu", Appointment: 11 },
  { day: "Fri", Appointment: 10 },
  { day: "Sat", Appointment: 7 },
  // { day: "Sun", Appointment: 214 },
];

const chartConfig = {
  Appointment: {
    label: "Appointment",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="Appointment" fill="teal" radius={4} />
        {/* <Bar dataKey="mobile" fill="teal" radius={4} /> */}
      </BarChart>
    </ChartContainer>
  );
}
