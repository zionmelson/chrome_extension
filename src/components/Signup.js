import React, { useState } from 'react';
import Footer from "./Footer";
import {  AiOutlineClose } from 'react-icons/ai';
import './index.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthorized, setAuthorized] = useState(localStorage.getItem("userLogedIn"));
    
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
                url: `${process.env.REACT_APP_API_URL}/mainapp/user/login/`
            }, 
            (result) => {
                localStorage.setItem("refresh", result.refresh);
                localStorage.setItem("access", result.access);
                localStorage.setItem("userLogedIn", true);
                setAuthorized(result.success);
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
                url: `${process.env.REACT_APP_API_URL}/mainapp/user/register/`
            }, 
            (result) => {
                if (result.success) {
                    chrome.runtime.sendMessage(
                        { 
                            action: "userLogin", 
                            username: username, 
                            password: password,
                            url: `${process.env.REACT_APP_API_URL}/mainapp/user/login/`
                        }, 
                        (result) => {
                            localStorage.setItem("refresh", result.refresh);
                            localStorage.setItem("access", result.access);
                            localStorage.setItem("userLogedIn", true);
                            setAuthorized(result.success);
                        }
                    );
                }
            }
        );
    };

    const handleLogout = () => {
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        localStorage.removeItem("userLogedIn");
        setAuthorized(false);
    }

    const handleCloseClick = () => {
        window.close(); // Close the popup window
    };

    return (
        <div>
            <div className="top-container">
                <div className="logo-container">
                    <img src={process.env.PUBLIC_URL + '/bear_without_background.png'} alt="bear without background" className="chrome-extension-logo" />
                    <h1>learnmutiny</h1>
                </div>
                <button onClick={handleCloseClick} className="close-popup"><AiOutlineClose className="close-popup" /></button>
            </div>
            <div className="bottom-container">
                {
                    isAuthorized ?
                    (
                        <>
                        <div className="top-container">
                            <h1>You are already logged in.</h1>
                        </div>
                        <div>
                            <button onClick={handleLogout} className="signup-button">Log Out</button>
                        </div>
                        </>
                    ) :
                    (
                        <>
                        <div className="top-container">
                            <h1>Signup</h1>
                        </div>
                        <div className="signup-container">
                            <div>
                                <label htmlFor="username">Email</label>
                                <input type="text" id="username" value={username} onChange={handleUsernameChange} className='form-field' />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" value={password} onChange={handlePasswordChange}  className='form-field' />
                            </div>
                            <div className="signup-button-container">
                                <button onClick={handleSignup} className="signup-button">Sign up</button>
                                <button onClick={handleSignin} className="signup-button">Sign in</button>
                            </div>
                        </div>
                        </>
                    )
                }                
            </div>
            <Footer />
        </div>
  );
};

export default Signup;
