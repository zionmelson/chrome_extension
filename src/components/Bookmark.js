import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Rating from "./Rating";
import Invalid from "./Temporary";
import "./index.css";
import Header from "./Header";

const Bookmark = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [icon, setIcon] = useState("");
  const [keywords, setKeywords] = useState("");
  const [validUrl, setValidUrl] = useState(true);
  const [isVideo, setIsVideo] = useState(true);

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

      // key word extraction
      const url = new URL(currentUrl);
      const urlKeywords = url.hostname.split(".").slice(1, -1).join(" ");
      const pathKeywords = url.pathname.split("/").filter(Boolean).join(" ");
      const sQuery = pageTitle
        .replace(/^\(\d+\)\s*/, "")
        .split(" - YouTube")[0];
      let searchQuery =
        sQuery.replace(/ - .*$/, "") + " " + urlKeywords + " " + pathKeywords;

      // Apply regex to modify searchQuery
      const words = searchQuery.trim().split(" ");
      if (
        words.length >= 2 &&
        /^(google|youtube)$/i.test(words[words.length - 2])
      ) {
        words.splice(words.length - 2, 2);
      } else if (
        words.length >= 1 &&
        /^(google|youtube)$/i.test(words[words.length - 1])
      ) {
        words.splice(words.length - 1, 1);
      }
      // Check if the last word is "results" and remove it
      if (words[words.length - 1].toLowerCase() === "results") {
        words.splice(words.length - 1, 1);
      }
      searchQuery = words.join(" ").trim();

      setTitle(truncatedTitle);
      setUrl(truncatedUrl);
      setIcon(pageIcon);
      setKeywords(searchQuery);
      setValidUrl(
        currentUrl.startsWith("https://") && !currentUrl.includes(".edu")
      );
      setIsVideo(currentUrl.startsWith("https://www.youtube.com/watch?"));
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
            keyword: keywords,
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

  return (
    <div>
      {validUrl ? (
        <div>
          <Header />
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
              {isVideo ? (
                <h2 className="how-helpful">How helpful was this video?</h2>
              ) : (
                <h2 className="how-helpful">How helpful was this link?</h2>
              )}
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
}

export default Bookmark;
