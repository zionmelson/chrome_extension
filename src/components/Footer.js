import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faThumbsUp,
  faSearch,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const Footer = () => {
  const [activeIcon, setActiveIcon] = useState("");

  const handleClick = (iconName) => {
    setActiveIcon((prevIcon) => (prevIcon === iconName ? "" : iconName));
  };

  return (
    <footer className="footer-bar">
      <div className="footer-top-items">
        <Link
          to="/"
          className={`footer-item ${activeIcon === "bookmark" ? "active" : ""}`}
          onClick={() => handleClick("bookmark")}
        >
          <FontAwesomeIcon icon={faBookmark} className="fa-2x" />
        </Link>

        <Link to="/thumbs-up" className="footer-item">
          <FontAwesomeIcon icon={faThumbsUp} className="fa-2x" />
        </Link>

        <Link to="/search" className="footer-item">
          <FontAwesomeIcon icon={faSearch} className="fa-2x" />
        </Link>
      </div>

      <Link to="/settings" className="footer-item">
        <FontAwesomeIcon icon={faCog} className="fa-2x" />
      </Link>
    </footer>
  );
};

export default Footer;
