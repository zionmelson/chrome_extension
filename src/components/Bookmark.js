import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Footer from "./Footer";
import Rating from "./Rating";
import Invalid from "./Temporary";
import "./index.css";

const Bookmark = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [icon, setIcon] = useState("");
  const [validUrl, setValidUrl] = useState(true);

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
      setValidUrl(currentUrl.startsWith("https://"));
    });
  }, []);

  const handleBookmark = async () => {
    //code to handle bookmark
    if (localStorage.getItem("userLogedIn")) {
      chrome.runtime.sendMessage(
        { 
            action: "bookmark",
            url: `${process.env.REACT_APP_API_URL}/mainapp/bookmark/`,
            title: title,
            rating: rating,
            keyword: "",
            bookmarkurl: url,
            access: localStorage.getItem("access")
        }, 
        (result) => {
          if (result) {
            // success
          } else {
            //fail
          }
        }
      );
    }
  };

  const handleCloseClick = () => {
    window.close(); // Close the popup window
  };

  return (
    <div>
      {validUrl ? (
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
                <Rating rating={rating} onRating={(rate) => setRating(rate)} />
              </div>
              <button className="add-bookmark" onClick={handleBookmark}>
                Bookmark
              </button>
              <p className="rating-text">{`${rating}.0 / 5.0 stars`}</p>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="invalid-url">
          <Invalid />
        </div>
      )}
    </div>
  );
};

export default Bookmark;
