import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import MappedTable from "./MappedTable";

export default class Stats extends Component {
  constructor() {
    super();
    this.state = {
      all: []
    };
  }

  async componentDidMount() {
    const response = await axios.get(`${API_BASE_URL}/history/all`);
    // const json = await response.json();
    const { data } = response;
    data.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
    this.setState({ all: data });
  }

  render() {
    const propertyNames = [
      "name",
      "totalGamesPlayed",
      "totalGamesWon",
      "percentage"
    ];
    return (
      <div className="nes-table-responsive">
        <MappedTable data={this.state.all} propertyNames={propertyNames} />
        {/* <ul>
          {this.state.all.map(el => (
            <li>
              {el.name}: {parseFloat(el.percentage)}
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}
