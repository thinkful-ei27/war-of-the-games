import React from "react";

export default class Input2 extends React.Component {


  render() {

    return (
      <>
        <input
          {...this.props.input}
          id={this.props.id}
          type={this.props.type}
          ref={input => (this.input = this.value)}
          name={this.props.name}
        />
        <label className={this.props.className} htmlFor={this.props.htmlFor}></label>
      </>
    );
  }
}
