// Hey VASTAV, I would rename this file to recommendation.js and add it to
// the src folder. I can help style it tomorrow (Tuesday June 6th).

// document.addEventListener("DOMContentLoaded", function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const currentTab = tabs[0];
//     if (!currentTab || !currentTab.title) {
//       console.error("Unable to retrieve tab title.");
//       return;
//     }
//     const pageTitle = currentTab.title;
//     const sQuery = pageTitle.replace(/^\(\d+\)\s*/, "").split(" - YouTube")[0];
//     const searchQuery = sQuery.replace(/ - .*$/, "");

//     chrome.runtime.sendMessage(
//       { action: "getRecommendedVideos", query: searchQuery },
//       function (response) {
//         if (chrome.runtime.lastError) {
//           console.error(chrome.runtime.lastError);
//           return;
//         }

//         if (response && response.videos) {
//           const videos = response.videos;
//           const videoList = document.getElementById("videoList");
//           videoList.innerHTML = "";

//           const queryElement = document.createElement("p");
//           queryElement.textContent = searchQuery;
//           videoList.appendChild(queryElement);

//           videos.forEach((video) => {
//             const listItem = document.createElement("li");

//             const title = document.createElement("h3");
//             const videoLink = document.createElement("a");
//             videoLink.textContent = video.title;
//             videoLink.href = `https://www.youtube.com/watch?v=${video.videoId}`;
//             videoLink.target = "_blank";

//             title.appendChild(videoLink);

//             const thumbnail = document.createElement("img");
//             thumbnail.src = video.thumbnail;

//             listItem.appendChild(title);
//             listItem.appendChild(thumbnail);

//             videoList.appendChild(listItem);
//           });
//         }
//         if (response && response.articles) {
//           const articles = response.articles;
//           const articlesList = document.getElementById("articlesList");
//           articlesList.innerHTML = "";

//           const queryElement = document.createElement("p");
//           queryElement.textContent = searchQuery;
//           articlesList.appendChild(queryElement);

//           if (articles.length === 0) {
//             const noArticles = document.createElement("p");
//             noArticles.textContent = "No articles found.";
//             articlesList.appendChild(noArticles);
//           }

//           articles.forEach((article) => {
//             const listItem = document.createElement("li");

//             const title = document.createElement("h3");
//             const articleLink = document.createElement("a");
//             articleLink.textContent = article.title;
//             articleLink.href = article.url;
//             articleLink.target = "_blank";

//             title.appendChild(articleLink);

//             const thumbnail = document.createElement("img");
//             thumbnail.src = article.imageUrl;

//             listItem.appendChild(title);
//             listItem.appendChild(thumbnail);

//             articlesList.appendChild(listItem);
//           });
//         }
//         if (response && response.books) {
//           const books = response.books;
//           const booksList = document.getElementById("booksList");
//           booksList.innerHTML = "";

//           const queryElement = document.createElement("p");
//           queryElement.textContent = searchQuery;
//           booksList.appendChild(queryElement);

//           if (books.length === 0) {
//             const noBooks = document.createElement("p");
//             noBooks.textContent = "No books found.";
//             booksList.appendChild(noBooks);
//           }

//           books.forEach((book) => {
//             const listItem = document.createElement("li");

//             const title = document.createElement("h3");
//             const bookLink = document.createElement("a");
//             bookLink.textContent = book.title;
//             bookLink.href = book.url;
//             bookLink.target = "_blank";

//             title.appendChild(bookLink);

//             const thumbnail = document.createElement("img");
//             thumbnail.src = book.thumbnail;

//             listItem.appendChild(title);
//             listItem.appendChild(thumbnail);

//             booksList.appendChild(listItem);
//           });
//         }
//       }
//     );
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (!currentTab || !currentTab.title) {
      console.error("Unable to retrieve tab title.");
      return;
    }
    const pageTitle = currentTab.title;
    const sQuery = pageTitle.replace(/^\(\d+\)\s*/, "").split(" - YouTube")[0];
    const searchQuery = sQuery.replace(/ - .*$/, "");

    chrome.runtime.sendMessage(
      { action: "getRecommendedVideos", query: searchQuery },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }

        if (response && response.videos) {
          const videos = response.videos;
          const videoList = document.getElementById("videoList");
          videoList.innerHTML = "";

          const queryElement = document.createElement("p");
          queryElement.textContent = searchQuery;
          videoList.appendChild(queryElement);

          videos.forEach((video) => {
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
          });
        }
        if (response && response.articles) {
          const articles = response.articles;
          const articlesList = document.getElementById("articlesList");
          articlesList.innerHTML = "";

          const queryElement = document.createElement("p");
          queryElement.textContent = searchQuery;
          articlesList.appendChild(queryElement);

          if (articles.length === 0) {
            const noArticles = document.createElement("p");
            noArticles.textContent = "No articles found.";
            articlesList.appendChild(noArticles);
          }

          articles.forEach((article) => {
            const listItem = document.createElement("li");

            const title = document.createElement("h3");
            const articleLink = document.createElement("a");
            articleLink.textContent = article.title;
            articleLink.href = article.url;
            articleLink.target = "_blank";

            title.appendChild(articleLink);

            const thumbnail = document.createElement("img");
            thumbnail.src = article.imageUrl;

            listItem.appendChild(title);
            listItem.appendChild(thumbnail);

            articlesList.appendChild(listItem);
          });
        }
        if (response && response.books) {
          const books = response.books;
          const booksList = document.getElementById("booksList");
          booksList.innerHTML = "";

          const queryElement = document.createElement("p");
          queryElement.textContent = searchQuery;
          booksList.appendChild(queryElement);

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
      }
    );
  });

  const ratingInput = document.getElementById("rating");
  ratingInput.addEventListener("input", function () {
    const rating = parseInt(ratingInput.value);
    console.log("Rating:", rating);
    // Perform any action based on the rating value
  });
  const bookmarkButton = document.getElementById("bookmarkButton");

  bookmarkButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      const pageTitle = currentTab.title;
      const pageUrl = currentTab.url;     

      chrome.runtime.sendMessage({ action: "bookmark", url: pageUrl });

      chrome.bookmarks.create(
        {
          title: pageTitle,
          url: pageUrl,
        },
        function (bookmark) {
          console.log("Bookmark created:", bookmark);          
        }
      );
    });
  });
});
