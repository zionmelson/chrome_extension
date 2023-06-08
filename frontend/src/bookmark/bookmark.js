//deprecated

// adding a new bookmark

const extension = document.querySelector(".bookmarks");
const bookmark = document.querySelector(".add-bookmark");

const urlPlaceholder = document.querySelector(".url");
const imagePlaceholder = document.querySelector(".page-image");
const titlePlaceholder = document.querySelector(".page-title");

const rating = document.querySelector(".rating");
const stars = document.querySelectorAll(".stars");
const ratingText = document.querySelector(".rating-text");

const defaultText = document.querySelector(".default-text");

let setStarRating = false;

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  console.log(tabs[0]);

  if (!url.startsWith("chrome://")) {
    let image = tabs[0].favIconUrl;
    let title = tabs[0].title;

    urlPlaceholder.innerHTML = url;
    imagePlaceholder.src = image;
    titlePlaceholder.innerHTML = title;

    setRating(stars);

    bookmark.addEventListener("click", async (e) => {
      e.preventDefault();
      setStarRating = true;

      chrome.runtime.sendMessage({ action: "bookmark", url: url });

      const encrypted = await encryptLink(url);
      displayEncryptedLink(encrypted);
    });
  } else {
    setDefault();
  }
});

function setDefault() {
  document.querySelector(".bookmark-info").removeChild(rating);
  document
    .querySelector(".bookmark-info")
    .removeChild(document.querySelector(".how-helpful"));

  extension.className = "default-bookmark";

  imagePlaceholder.src = "../../../assets/bear.png";
  imagePlaceholder.className = "default-page-image";

  bookmark.className = "default-button";

  defaultText.innerHTML =
    "Looks like there's nothing to bookmark on this page.";
}

async function encryptLink(_url) {
  const encodedParams = new URLSearchParams();
  encodedParams.append("url", `${_url}`);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": `cb59b130f6mshb1b2069997b5241p17b9cfjsn983efb4679e3`,
      "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
    },
    body: encodedParams,
  };

  const fetched = await fetch(
    "https://url-shortener-service.p.rapidapi.com/shorten",
    options
  );
  const response = await fetched.json();
  return response;
}

function displayEncryptedLink(short) {
  document.querySelector(".bookmark-info").removeChild(defaultText);

  urlPlaceholder.innerHTML = `
  <h4>Encrypted bookmark:</h4> 
  <p>${short.result_url}</p>`;
}

function setRating(_stars) {
  _stars.forEach((star, i) => {
    star.onclick = function () {
      if (setStarRating == false) {
        let currentStar = i + 1;
        _stars.forEach((star, j) => {
          if (currentStar >= j + 1) {
            star.style.color = "#FFAB09";
            ratingText.innerHTML = `${currentStar}.0 / 5.0 stars`;
          } else {
            star.style.color = "#D9D9D9";
            ratingText.innerHTML = `${currentStar}.0 / 5.0 stars`;
          }
        });
      }
    };
  });
}
