import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./index.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    //signup logic
    console.log("Signup:", username, password);
  };

  const handleSignin = (e) => {
    e.preventDefault();
    //signin logic
    console.log("Signin:", username, password);
  };

  const handleCloseClick = () => {
    window.close(); // Close the popup window
  };

  return (
    <div>
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
          <AiOutlineClose
            className="close-popup"
            style={{ cursor: "pointer" }}
          />
        </button>
      </div>
      <div className="bottom-container">
        <div className="top-container">
          <h1>Signup</h1>
        </div>
        <div className="bookmark-info">
          <form>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="form-field"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-field"
              />
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSignup}
                className="signup-button"
              >
                Sign up
              </button>
              <button
                type="submit"
                onClick={handleSignin}
                className="signup-button"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
