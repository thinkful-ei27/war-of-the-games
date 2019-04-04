import React from 'react'
import { SignupPrompt } from './signupPrompt';
import { checkVoteCount } from '../local-storage';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  componentDidMount() {
    checkVoteCount();
  }
  render() {
    if (this.state.errorInfo) {
      return (
        <div className="sign-up-prompt">
          <div className="nes-container is-rounded is-dark">
            <p>Something Went Wrong... Try Refreshing the Page</p>
          </div>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}