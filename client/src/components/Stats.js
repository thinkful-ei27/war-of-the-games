import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import MappedTable from "./MappedTable";
import "./styles/gameInfo.css";

export default class Stats extends Component {
  constructor() {
    super();
    this.state = {
      all: [],
      topFive: [],
      bottomFive: []
    };
  }

  async componentDidMount() {
    const response = await axios.get(`${API_BASE_URL}/history/all`);
    // const json = await response.json();
    const { data } = response;
    const rData = data
      .sort((a, b) => {
        if (a.percentage < b.percentage) return 1;
        if (a.percentage > b.percentage) return -1;
        return 0;
      })
      .filter(g => !isNaN(parseFloat(g.percentage)));
    const topFive = rData.slice(0, 5);
    const bottomFive = rData.slice(rData.length - 5);
    this.setState({ all: rData, topFive, bottomFive });
  }

  render() {
    const propertyNames = [
      "id",
      "totalGamesPlayed",
      "totalGamesWon",
      "percentage"
    ];
    return (
      <>
        <section className="game-container mx-auto">
          <section className="mt-16">
            <h3 className="title">Top 5</h3>
            <div className="nes-table-responsive">
              <MappedTable
                data={this.state.topFive}
                propertyNames={propertyNames}
              />
            </div>
          </section>
          <section className="mt-16">
            <h3 className="title">Bottom 5</h3>
            <div className="nes-table-responsive">
              <MappedTable
                data={this.state.bottomFive}
                propertyNames={propertyNames}
              />
            </div>
          </section>
          <section className="mt-16">
            <h3 className="title">All</h3>
            <div className="nes-table-responsive">
              <MappedTable
                data={this.state.all}
                propertyNames={propertyNames}
              />
            </div>
          </section>
        </section>
      </>
    );
  }
}
