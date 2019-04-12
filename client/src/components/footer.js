import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles/footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-content">
        &#169; 2019 - <span>*ASYNC</span> -
        <Link className="learn-more-link" to="/about">
          About Us
        </Link>
      </p>
    </footer>
  );
}

const mapStateToProps = state => ({
  screenWidth: state.window.width
});

export default connect(mapStateToProps)(Footer);
