import React from "react";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from "recharts";

const data = [
  { motivation: "Creativity", value: 62, fullMark: 100 },
  { motivation: "Mastery", value: 53, fullMark: 100 },
  { motivation: "Social", value: 57, fullMark: 100 },
  { motivation: "Action", value: 50, fullMark: 100 },
  { motivation: "Immersion", value: 72, fullMark: 100 },
  { motivation: "Achievement", value: 63, fullMark: 100 }
];

export default function MotivationsChart() {
  return (
    <div>
      <ResponsiveContainer>
        <RadarChart outerRadius={90} width={730} height={250} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="motivation" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="User"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          {/* <Radar
          name="Lily"
          dataKey="B"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        /> */}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
