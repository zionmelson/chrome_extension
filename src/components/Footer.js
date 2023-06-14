import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faThumbsUp, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Footer = () => {
    const [activeIcon, setActiveIcon] = useState('');

    const handleClick = (iconName) => {
        setActiveIcon((prevIcon) => (prevIcon === iconName ? '' : iconName));
    };

    return (
        <footer className="footer-bar">
            <div className="footer-top-items">
                <div className={`footer-item ${activeIcon === 'bookmark' ? 'active' : ''}`} onClick={() => handleClick('bookmark')}>
                    <FontAwesomeIcon icon={faBookmark} className="fa-2x" />
                </div>
                <div className={`footer-item like-button ${activeIcon === 'thumbsUp' ? 'active' : ''}`} onClick={() => handleClick('thumbsUp')}>
                    <Link to="/thumbs-up" className={`footer-item like-button ${activeIcon === 'thumbsUp' ? 'active' : ''}`} onClick={() => handleClick('thumbsUp')}>
                        <FontAwesomeIcon icon={faThumbsUp} className="fa-2x" />
                    </Link>
                </div>
                <div className={`footer-item search-icon ${activeIcon === 'search' ? 'active' : ''}`} onClick={() => handleClick('search')}>
                    <Link to="/search" className={`footer-item search-icon ${activeIcon === 'search' ? 'active' : ''}`} onClick={() => handleClick('search')}>
                        <FontAwesomeIcon icon={faSearch} className="fa-2x" />
                    </Link>
                </div>
            </div>
            <div className={`footer-item ${activeIcon === 'cog' ? 'active' : ''}`} onClick={() => handleClick('cog')}>
                <Link to="/settings" className={`footer-item ${activeIcon === 'cog' ? 'active' : ''}`} onClick={() => handleClick('cog')}>
                    <FontAwesomeIcon icon={faCog} className="fa-2x" />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
