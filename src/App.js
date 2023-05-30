import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [url, setUrl] = useState('');
  const [rating, setRating] = useState(0);

 //Get Current Url
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const currentUrl = currentTab.url;
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>URL:</p>
        <p>{url}</p>
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
      </header>
    </div>
  );
};

export default App;
