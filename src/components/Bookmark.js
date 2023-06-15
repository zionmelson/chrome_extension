import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineClose } from "react-icons/ai";
import Footer from "./Footer";
import "./index.css";

const Bookmark = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [icon, setIcon] = useState("");
  const [starRatingEnabled, setStarRatingEnabled] = useState(false);
  //Get Current Url
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const currentUrl = currentTab.url;
      const pageTitle = currentTab.title;
      const pageIcon = currentTab.favIconUrl;
      const truncatedTitle =
        pageTitle.length > 20 ? `${pageTitle.substring(0, 20)}...` : pageTitle;
      const truncatedUrl =
        currentUrl.length > 30
          ? `${currentUrl.substring(0, 30)}...`
          : currentUrl;

      setTitle(truncatedTitle);
      setUrl(truncatedUrl);
      setIcon(pageIcon);
      setStarRatingEnabled(true);
    });
  }, []);

  const handleBookmark = async (e) => {
    //code to handle bookmark
    e.preventDefault();
    setStarRatingEnabled(true);
  };

  const handleStarClick = (currentStar) => {
    if (!starRatingEnabled) return;

    setRating(currentStar);

    const stars = document.querySelectorAll(".stars");
    stars.forEach((star, i) => {
      if (currentStar >= i + 1) {
        star.style.color = "#FFAB09";
      } else {
        star.style.color = "#D9D9D9";
      }
    });
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
        <button onClick={handleCloseClick} className="close-popup">
          <AiOutlineClose className="close-popup" />
        </button>
      </div>
      <div className="bottom-container">
        <div className="top-container">
          <div>
            <h1 className="website-title">{title}</h1>
            <p>{url}</p>
          </div>
          <div>
            <img src={icon} style={{ width: "50px", height: "50px" }} />
          </div>
        </div>

        <div className="bookmark-info">
          <h2 className="how-helpful">How helpful was this link?</h2>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="stars"
                onClick={() => handleStarClick(star)}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  className={star <= rating ? "checked" : ""}
                />
              </button>
            ))}
          </div>
          <button className="add-bookmark" onClick={handleBookmark}>
            Bookmark
          </button>
          <p className="rating-text">{`${rating}.0 / 5.0 stars`}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bookmark;
