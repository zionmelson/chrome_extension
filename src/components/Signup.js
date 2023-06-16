import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./index.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signedup, setSignedup] = useState(false);
  const [error, setError] = useState(false);
  const [isAuthorized, setAuthorized] = useState(
    localStorage.getItem("userLogedIn")
  );
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = () => {
    //signup logic
    chrome.runtime.sendMessage(
      {
        action: "userLogin",
        username: username,
        password: password,
        url: `${process.env.REACT_APP_API_URL}/mainapp/user/login/`,
      },
      (result) => {
        if (result.success) {
          localStorage.setItem("refresh", result.refresh);
          localStorage.setItem("access", result.access);
          localStorage.setItem("userLogedIn", true);
          localStorage.setItem("email", username);
          setAuthorized(result.success);
          navigate("/bookmark")
        } else {
          setError(true);
          setAuthorized(result.success);
        }
      }
    );
  };

  const handleSignup = async () => {
    //signin logic
    chrome.runtime.sendMessage(
      {
        action: "userRegister",
        username: username,
        password: password,
        url: `${process.env.REACT_APP_API_URL}/mainapp/user/register/`,
      },
      (result) => {
        if (result.success) {
          chrome.runtime.sendMessage(
            {
              action: "userLogin",
              username: username,
              password: password,
              url: `${process.env.REACT_APP_API_URL}/mainapp/user/login/`,
            },
            (result) => {
              if (result.success) {
                localStorage.setItem("refresh", result.refresh);
                localStorage.setItem("access", result.access);
                localStorage.setItem("userLogedIn", true);
                localStorage.setItem("email", username);
                setSignedup(true);
                setAuthorized(result.success);
                navigate("/bookmark")
              }
            }
          );
        }
      }
    );
  };

  const handleSignout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    localStorage.removeItem("userLogedin");
    localStorage.removeItem("email");
    setAuthorized(false);
  }

  return (
    <div>
      <Header />
      <div className="bottom-container">
        <div className="signout-button" onClick={handleSignout}>sign out</div>
        {isAuthorized ? (
          <>
            <div className="temp-container">
              {signedup ? (
                <h1>Great your signed up.</h1>
              ) : (
                <>
                  <h1>signed in:</h1>
                  <h1>{localStorage.getItem("email")}</h1>
                </>
              )}
            </div>
            <div className="bookmark-info">
              <img
                src={process.env.PUBLIC_URL + "/bear_without_background.png"}
                alt="bear without background"
                className="bear-image"
              />
            </div>
            <Footer />
          </>
        ) : (
          <>
            <div className="top-container">
              <h1>Signup</h1>
              {error && (
                <div className="sign-error-label">Account not found</div>
              )}
            </div>
            <div className="signup-container">
              <div>
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className={error ? "form-field-error" : "form-field"}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={error ? "form-field-error" : "form-field"}
                />
              </div>
              <div className="signup-button-container">
                <button onClick={handleSignup} className="signup-button">
                  Sign up
                </button>
                <button
                  onClick={handleSignin}
                  className={error ? "signup-button-error" : "signup-button"}
                >
                  Sign in
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
