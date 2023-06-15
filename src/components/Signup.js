import React, { useState } from 'react';
import {  AiOutlineClose } from 'react-icons/ai';
import { userLogin} from '../services';
import './index.css';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthorized, setAuthorized] = useState(localStorage.getItem("isAuthorized"));

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
                url: `${process.env.REACT_APP_API_URL}/mainapp/user/login/`
            }, 
            (result) => {
                setAuthorized(result.success);
            }
        );
    };

    const handleLogout = () => {
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        localStorage.removeItem("isAuthorized");
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
                        <div className="bookmark-info">
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" value={username} onChange={handleUsernameChange} className='form-field' />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" value={password} onChange={handlePasswordChange}  className='form-field' />
                            </div>
                            <div>
                                <button onClick={handleSignup} className="signup-button">Sign up</button>
                                <button onClick={handleSignin} className="signup-button">Sign in</button>
                            </div>
                        </div>
                        </>
                    )
                }                
            </div>
        </div>
    );
};

export default Signup;