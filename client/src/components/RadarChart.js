import React, { Component } from "react";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
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
    const { motivations } = this.props;
    const data = motivations;
    console.log(motivations);
    return (
      <div>
        <RadarChart outerRadius={90} width={730} height={250} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="motivation" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="User"
            dataKey="percentage"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  motivations: state.user.motivations
});

export default connect(mapStateToProps)(MotivationsChart);
