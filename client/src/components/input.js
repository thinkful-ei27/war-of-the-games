import React from "react";

export default class Input extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.input.focus();
    }
  }

  render() {
    let error;
    const { meta, input, label, type, className } = this.props;
    if (meta.touched && meta.error) {
      error = <div className="form-error">{meta.error}</div>;
    }

    let warning;
    if (meta.touched && meta.warning) {
      warning = <div className="form-warning">{meta.warning}</div>;
    }

    return (
      <div className="form-input">
        <label htmlFor={input.name}>
          {label}
          {error}
          {warning}
        </label>
        <input
          {...input}
          id={input.name}
          type={type}
          ref={input => (this.input = input)}
          className={className}
          name={input.name}
        />
      </div>
    );
  }
}
