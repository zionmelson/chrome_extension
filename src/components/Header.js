import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const handleCloseClick = () => {
    window.close(); // Close the popup window
  };

  return (
    <div className="top-container">
      <div className="logo-container">
        <img
          src={process.env.PUBLIC_URL + "/bear_without_background.png"}
          alt="bear without background"
          className="chrome-extension-logo"
        />
        <h1>learnmutiny</h1>
      </div>
      <button
        onClick={handleCloseClick}
        className="close-popup"
        style={{ cursor: "pointer" }}
      >
        <AiOutlineClose className="close-popup" />
      </button>
    </div>
  );
};

export default Header;
