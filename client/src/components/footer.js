import React from "react";
import "./styles/footer.css";

export default function Footer() {
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
          Learn more about the creators
        </a>
      </p>
    </footer>
  );
}
