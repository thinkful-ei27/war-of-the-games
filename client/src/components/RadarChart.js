import React, { Component } from "react";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip
} from "recharts";
import CustomToolTip from "./RadarToolTip";

const MotivationsChart = props => {
  const { data, name } = props;

  let content;

  if (data.length < 3) {
    content = <p>Vote more to see your gaming motivations!!!</p>;
  } else {
    content = (
      <div>
        <ResponsiveContainer
          aspect={1}
          width={320}
          height="30%"
          minWidth={320}
          minHeight={320}
          padding={0}
        >
          <RadarChart tick={{ fontSize: 5 }} outerRadius={90} data={data}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="motivation"
              tick={{ fontSize: 6.5, fill: "white" }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Legend
              wrapperStyle={{
                position: "absolute",
                top: 0,
                left: -15,
                fontSize: "10px"
              }}
            />
            <Radar
              name={`${name}'s motivations`}
              dataKey="percentage"
              stroke="#8884d8"
              fill="white"
              fillOpacity={0.6}
              legendType="line"
            />
            <Tooltip
              wrapperStyle={{
                background: "black",
                opacity: 0.8,
                borderRadius: 5,
                color: "white",
                padding: 5
              }}
              content={<CustomToolTip />}
              coordinate={{ x: 10, y: 10 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default MotivationsChart;
