import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faCog } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import "./index.css";

const Footer = () => {
  const [activeIcon, setActiveIcon] = useState("bookmark");

  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    if (pathname === "/") {
      setActiveIcon("bookmark");
    } else if (pathname === "/thumbs-up") {
      setActiveIcon("thumbs-up");
    } else if (pathname === "/search") {
      setActiveIcon("search");
    } else if (pathname === "/settings") {
      setActiveIcon("settings");
    } else if (pathname === "/auth") {
      setActiveIcon("auth");
    } else {
      setActiveIcon("");
    }
  }, [location]);

  const handleClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <footer className="footer-bar">
      <div className="footer-top-items">
        <Link
          to="/"
          className="footer-item"
          onClick={() => handleClick("bookmark")}
        >
          <FontAwesomeIcon
            icon={faBookmark}
            className={`fa-3x ${
              activeIcon === "bookmark" ? "active" : "inactive"
            }`}
          />
        </Link>

        <Link
          to="/thumbs-up"
          className="footer-item"
          onClick={() => handleClick("thumbs-up")}
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={`fa-3x ${
              activeIcon === "thumbs-up" ? "active" : "inactive"
            }`}
          />
        </Link>

        <Link
          to="/search"
          className="footer-item"
          onClick={() => handleClick("search")}
        >
          <FontAwesomeIcon
            icon={faSearch}
            className={`fa-3x ${
              activeIcon === "search" ? "active" : "inactive"
            }`}
          />
        </Link>
      </div>
      <div className="footer-top-items">
        <Link
          to="/auth"
          className="footer-item"
          onClick={() => handleClick("auth")}
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            className={`fa-2x ${activeIcon === "auth" ? "active" : "inactive"}`}
          />
        </Link>
        <Link
          to="/settings"
          className="footer-item"
          onClick={() => handleClick("settings")}
        >
          <FontAwesomeIcon
            icon={faCog}
            className={`fa-2x  ${
              activeIcon === "settings" ? "active" : "inactive"
            }`}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
