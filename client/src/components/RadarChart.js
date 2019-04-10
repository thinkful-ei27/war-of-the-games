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
import CustomToolTip from "./RadarToolTip";
import { getUserMotivationData } from "../actions/users";

class MotivationsChart extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getUserMotivationData());
  }

  render() {
    const { motivations, name } = this.props;
    const data = motivations;
    if (data.length) {
      return (
        <div>
          <ResponsiveContainer
            aspect={1}
            width={320}
            height="30%"
            minWidth={320}
            minHeight={320}
            padding={0}
          >
            <RadarChart
              tick={{ fontSize: 5 }}
              outerRadius={90}
              data={data}
              wrapperStyle={{ position: "absolute", left: "0" }}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="motivation" tick={{ fontSize: 6.5 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Legend wrapperStyle={{ position: "absolute", top: 30 }} />
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
    return <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  motivations: state.user.motivations
});

export default connect(mapStateToProps)(MotivationsChart);
