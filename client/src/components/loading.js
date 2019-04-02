import React, { Component } from 'react';
import './styles/loading.css';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    };
  }

  componentDidMount() {
    const { intervalSpeed } = this.props;
    this.intervalId = setInterval(() => this.fillBar(), intervalSpeed);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  fillBar() {
    const { progress } = this.state;
    const { incrementBy } = this.props;
    if (progress >= 100) {
      this.setState({ progress: 0 });
    } else {
      this.setState(prevState => ({
        progress: prevState.progress + incrementBy
      }));
    }
  }

  render() {
    const { progress } = this.state;
    const { size } = this.props;
    return (
      <div className="loading-container">
        <p className="loading-txt">Loading...</p>
        <progress
          className={`nes-progress ${size}`}
          value={progress}
          max="100"
        />
      </div>
    );
  }
}

Loading.defaultProps = {
  intervalSpeed: 25,
  incrementBy: 3,
  size: 'md'
};
