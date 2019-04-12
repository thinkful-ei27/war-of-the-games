import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearAuth } from "../../actions/auth";
import { clearAuthToken } from "../../local-storage";
import { nextTestSuccess } from "../../actions/onboarding";

export function MenuItem(props) {
  const { name, link } = props;
  const logout = () => {
    props.dispatch(clearAuth());
    clearAuthToken();
    this.props.dispatch(nextTestSuccess("test2"));
  };
  return (
    <li className="nes-text is-primary p-4">
      <Link
        to={link}
        className=""
        onClick={name === "Sign Out" ? () => logout() : null}
      >
        {name}
      </Link>
    </li>
  );
}

export default connect()(MenuItem);
