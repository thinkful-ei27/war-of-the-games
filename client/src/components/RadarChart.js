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
import Loading from "./loading";

class MotivationsChart extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getUserMotivationData()).then(results => results.data);
  }

  render() {
    const { motivations, name, loading } = this.props;

    const data = motivations;
    let content;
    if (loading) {
      content = <Loading />;
    }
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
            <RadarChart
              tick={{ fontSize: 5 }}
              outerRadius={90}
              data={data}
              wrapperStyle={{ position: "absolute", left: "0" }}
            >
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
                  fontSize: "10px",
                  margin: "0 auto"
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
  }
}

MotivationsChart.defaultProps = {
  motivations: [
    { motivation: "action", percentage: 0, fullMark: 100 },
    { motivation: "social", percentage: 0, fullMark: 100 },
    { motivation: "mastery", percentage: 0, fullMark: 100 },
    { motivation: "immersion", percentage: 0, fullMark: 100 },
    { motivation: "creativity", percentage: 0, fullMark: 100 },
    { motivation: "achievment", percentage: 0, fullMark: 100 }
  ]
};

const mapStateToProps = state => ({
  motivations: state.user.motivations,
  loading: state.user.loading
});

export default connect(mapStateToProps)(MotivationsChart);
