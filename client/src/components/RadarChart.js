import React, { Component } from "react";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
  Text
} from "recharts";
import { connect } from "react-redux";
import CustomToolTip from "./RadarToolTip";
import { getUserMotivationData } from "../actions/users";

// const data = [
//   { motivation: "Creativity", value: 62, fullMark: 100 },
//   { motivation: "Mastery", value: 53, fullMark: 100 },
//   { motivation: "Social", value: 57, fullMark: 100 },
//   { motivation: "Action", value: 50, fullMark: 100 },
//   { motivation: "Immersion", value: 72, fullMark: 100 },
//   { motivation: "Achievement", value: 63, fullMark: 100 }
// ];

class MotivationsChart extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getUserMotivationData());
  }

  render() {
    const { motivations, name } = this.props;
    const data = motivations;
    const { motivation, percentage } = data;
    console.log(data);

    return (
      <div id="container">
        <ResponsiveContainer>
          <RadarChart
            outerRadius="80%"
            tick={{ fontSize: 5, fill: "white" }}
            data={data}
            // wrapperStyle={{ position: "absolute", left: "0" }}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="motivation"
              tick={{ fontSize: 6.5, fill: "white" }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            {/* <Legend wrapperStyle={{ position: "absolute", top: 30 }} /> */}
            <Radar
              name={`${name}'s motivations`}
              dataKey="percentage"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip
              wrapperStyle={{
                background: "black",
                opacity: 0.6,
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
}

const mapStateToProps = state => ({
  motivations: state.user.motivations
});

export default connect(mapStateToProps)(MotivationsChart);
