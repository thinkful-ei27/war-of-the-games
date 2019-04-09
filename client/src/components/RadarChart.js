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
import { connect } from "react-redux";
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
      <div>
        <ResponsiveContainer aspect={3} width="100%" margin={0}>
          <RadarChart
            outerRadius={90}
            width={700}
            height={250}
            cx="50%"
            data={data}
            wrapperStyle={{ position: "absolute", left: "0" }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="motivation" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Legend wrapperStyle={{ position: "absolute", top: 30 }} />
            <Radar
              // name={`${name}'s motivations`}
              dataKey="percentage"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
              // label={false}
            />
            <Tooltip
              viewBox={{ x: 10, y: 10, width: 50, height: 100 }}
              separator="  for this field is  "
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
