document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (
      !currentTab ||
      !currentTab.title ||
      !currentTab.url.startsWith("http")
    ) {
      displayErrorMessage("I can't help you.");
      return;
    }

    const pageTitle = currentTab.title;
    const url = new URL(currentTab.url);
    const urlKeywords = url.hostname.split(".").slice(1, -1).join(" ");
    const pathKeywords = url.pathname.split("/").filter(Boolean).join(" ");
    const sQuery = pageTitle.replace(/^\(\d+\)\s*/, "").split(" - YouTube")[0];
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
    // console.log(searchQuery);

    chrome.runtime.sendMessage(
      { action: "getRecommendedVideos", query: searchQuery },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          displayErrorMessage("Failed to fetch recommended videos");
          return;
        }

        if (response && response.videos) {
          const videos = response.videos;
          const videoList = document.getElementById("videoList");
          videoList.innerHTML = "";

          // const queryElement = document.createElement("p");
          // queryElement.textContent = searchQuery;
          // videoList.appendChild(queryElement);

          let videoCount = 0;
          const currentVideoId = getCurrentVideoId(url);

          videos.forEach((video) => {
            if (video.videoId !== currentVideoId && videoCount < 3) {
              const listItem = document.createElement("li");

              const title = document.createElement("h3");
              const videoLink = document.createElement("a");
              videoLink.textContent = video.title;
              videoLink.href = `https://www.youtube.com/watch?v=${video.videoId}`;
              videoLink.target = "_blank";

              title.appendChild(videoLink);

              const thumbnail = document.createElement("img");
              thumbnail.src = video.thumbnail;

              listItem.appendChild(title);
              listItem.appendChild(thumbnail);

              videoList.appendChild(listItem);

              videoCount++;
            }
          });

          if (videoCount === 0) {
            const noVideos = document.createElement("p");
            noVideos.textContent = "No relevant videos found.";
            videoList.appendChild(noVideos);
          }
        }

        if (response && response.books) {
          const books = response.books;
          const booksList = document.getElementById("booksList");
          booksList.innerHTML = "";

          // const queryElement = document.createElement("p");
          // queryElement.textContent = searchQuery;
          // booksList.appendChild(queryElement);

          if (books.length === 0) {
            const noBooks = document.createElement("p");
            noBooks.textContent = "No books found.";
            booksList.appendChild(noBooks);
          }

          books.forEach((book) => {
            const listItem = document.createElement("li");

            const title = document.createElement("h3");
            const bookLink = document.createElement("a");
            bookLink.textContent = book.title;
            bookLink.href = book.url;
            bookLink.target = "_blank";

            title.appendChild(bookLink);

            const thumbnail = document.createElement("img");
            thumbnail.src = book.thumbnail;

            listItem.appendChild(title);
            listItem.appendChild(thumbnail);

            booksList.appendChild(listItem);
          });
        }
        if (response && response.links) {
          const links = response.links;
          const linksList = document.getElementById("linksList");
          linksList.innerHTML = "";

          // const queryElement = document.createElement("p");
          // queryElement.textContent = searchQuery;
          // linksList.appendChild(queryElement);

          const titleElement = document.createElement("h2");
          titleElement.textContent = "Search Results";
          linksList.appendChild(titleElement);

          // const linksHeading = document.createElement("h3");
          // linksHeading.textContent = "Links";
          // linksList.appendChild(linksHeading);

          if (links.length === 0) {
            const noLinks = document.createElement("p");
            noLinks.textContent = "No links found.";
            linksList.appendChild(noLinks);
          }

          links.forEach((link) => {
            const listItem = document.createElement("li");

            const linkTitle = document.createElement("h4");
            linkTitle.textContent = link.title;

            const linkElement = document.createElement("a");
            linkElement.textContent = link.url;
            linkElement.href = link.url;
            linkElement.target = "_blank";

            listItem.appendChild(linkTitle);
            listItem.appendChild(linkElement);

            linksList.appendChild(listItem);
          });
        }
      }
    );
  });
});

function getCurrentVideoId(url) {
  const urlParams = new URLSearchParams(url.search);
  const vParam = urlParams.get("v");
  if (vParam) {
    return vParam;
  }

  const parts = url.pathname.split("/");
  if (parts.length >= 2 && parts[1] === "watch") {
    return parts[2];
  }

  return null;
}

function displayErrorMessage(message) {
  const errorElement = document.getElementById("errorMessage");
  errorElement.textContent = message;
}