import React, { Component } from "react";

export default class LongText extends Component {
  state = { showAll: false };
  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });
  render() {
    console.log(this.props);
    const { content, limit } = this.props;
    const { showAll } = this.state;
    if (content.length <= limit) {
      // there is nothing more to show
      return <div>{content}</div>;
    }
    if (showAll) {
      // We show the extended text and a link to reduce it
      return (
        <div className="text-sm">
          {content}
          <a className="nes-text is-primary" onClick={this.showLess}>
            Read less
          </a>
        </div>
      );
    }
    // In the final case, we show a text with ellipsis and a `Read more` button
    const toShow = content.substring(0, limit) + "...";
    return (
      <div className="text-sm">
        {toShow}
        <span onClick={this.showMore} className="nes-text is-primary">
          Read more
        </span>
      </div>
    );
  }
}

LongText.defaultProps = {
  content: ""
};
