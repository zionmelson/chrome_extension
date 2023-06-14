import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './index.css'

const Bookmark = () => {

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
                <div className="top-container">
                <h1>There doesn&apos;t seem to be anything on this page I can help you with.</h1>
                </div>
                <div className="bookmark-info">
                <img src={process.env.PUBLIC_URL + '/bear_without_background.png'} alt="bear without background" className="bear-image" />
                </div>
            </div>
        </div>
    );
};

export default Bookmark;