import React from "react";
import { connect } from "react-redux";
import "./styles/footer.css";

export function Footer(props) {
  const { screenWidth } = props;

  let linkText = "Learn More";

  if (screenWidth > 600) {
    linkText = "Learn more about the creators";
  }
  return (
    <footer className="footer">
      <p className="footer-content">
        &#169; 2019 - <span>*ASYNC</span> -
        <a
          className="learn-more-link"
          href="https://github.com/thinkful-ei27/war-of-the-games"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </a>
      </p>
    </footer>
  );
}

const mapStateToProps = state => ({
  screenWidth: state.window.width
});

export default connect(mapStateToProps)(Footer);
