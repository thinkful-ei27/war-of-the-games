import React from "react";
import { checkVoteCount } from "../local-storage";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorInfo: null };
  }

  componentDidMount() {
    checkVoteCount();
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      return (
        <div className="sign-up-prompt">
          <div className="nes-container is-rounded is-dark">
            <p>Something Went Wrong... Try Refreshing the Page</p>
          </div>
        </div>
      );
    }
    // Normally, just render children
    return children;
  }
}
