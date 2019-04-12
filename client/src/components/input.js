import React from "react";

export default class Input extends React.Component {
  componentDidUpdate(prevProps) {
    const { meta } = this.props;
    if (!prevProps.meta.active && meta.active) {
      this.input.focus();
    }
  }

  render() {
    let error;
    const { meta, input, label, type, className, placeholder } = this.props;
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
          ref={inputEl => (this.input = inputEl)}
          className={className}
          name={input.name}
          placeholder={placeholder}
        />
      </div>
    );
  }
}
