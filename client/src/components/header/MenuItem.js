import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearAuth } from "../../actions/auth";
import { clearAuthToken } from "../../local-storage";
import { nextTestSuccess } from "../../actions/onboarding";
import "../styles/MenuItem.css";

export function MenuItem(props) {
  const { dispatch, name, link } = props;
  const logout = () => {
    props.dispatch(clearAuth());
    clearAuthToken();
    dispatch(nextTestSuccess("test2"));
  };
  return (
    <li className="menu-item nes-text is-primary">
      <Link
        to={link || ""}
        className="menu-item__link p-4"
        onClick={name === "Sign Out" ? () => logout() : null}
      >
        {name}
      </Link>
    </li>
  );
}

export default connect()(MenuItem);
