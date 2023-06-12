import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { LuRefreshCw } from 'react-icons/lu';
import './App.css';
import './index.css'

const App = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);

  //Get Current Url
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const currentUrl = currentTab.url;
      const pageTitle = currentTab.title;
      setTitle(pageTitle);
      setUrl(currentUrl);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a message to the background script to save the rating and bookmark the current page
    chrome.runtime.sendMessage({ action: "saveRating", rating, url }, (response) => {
      if (response && response.success) {
        console.log("Rating and bookmark saved successfully");
      }
    });
  };

  const handleRatingChange = (event) => {
    const newRating = parseInt(event.target.value);
    setRating(newRating);
  };

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
        <h1 className="website-title">{title}</h1>
        <div className="url-container">
          <p>{url}</p>
          <div className="refresh-container">
            <LuRefreshCw /><span><p>Refresh</p></span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Rate the usefulness of the content:</p>
            <input type="radio" name="rating" value="1" checked={rating === 1} onChange={handleRatingChange} /> 1
            <input type="radio" name="rating" value="2" checked={rating === 2} onChange={handleRatingChange} /> 2
            <input type="radio" name="rating" value="3" checked={rating === 3} onChange={handleRatingChange} /> 3
            <input type="radio" name="rating" value="4" checked={rating === 4} onChange={handleRatingChange} /> 4
            <input type="radio" name="rating" value="5" checked={rating === 5} onChange={handleRatingChange} /> 5
          </div>
          <button type="submit">Bookmark</button>
        </form>
      </div>
    </div>
  );
};

export default App;
