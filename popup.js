

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
    const url = new URL(currentTab.url);
    const urlKeywords = url.hostname.split('.').slice(1, -1).join(' ');
    const pathKeywords = url.pathname.split('/').filter(Boolean).join(' ');
    const sQuery = pageTitle.replace(/^\(\d+\)\s*/, "").split(" - YouTube")[0];
    let searchQuery = sQuery.replace(/ - .*$/, "") + " " + urlKeywords + " " + pathKeywords;
    
    // Apply regex to modify searchQuery
   
    const words = searchQuery.trim().split(" ");
    if (words.length >= 2 && /^(google|youtube)$/i.test(words[words.length - 2])) {
      words.splice(words.length - 2, 2);
    } else if (words.length >= 1 && /^(google|youtube)$/i.test(words[words.length - 1])) {
      words.splice(words.length - 1, 1);
    }
    
    // Check if the last word is "results" and remove it
    if (words[words.length - 1].toLowerCase() === "results") {
      words.splice(words.length - 1, 1);
    }
    
    searchQuery = words.join(" ").trim();
    
    console.log(searchQuery);
    



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
        if (response && response.movies) {
          const movies = response.movies;
          const moviesList = document.getElementById("moviesList");
          moviesList.innerHTML = "";
        
          const queryElement = document.createElement("p");
          queryElement.textContent = response.query;
          moviesList.appendChild(queryElement);
        
          if (movies.length === 0) {
            const noMovies = document.createElement("p");
            noMovies.textContent = "No movies found.";
            moviesList.appendChild(noMovies);
          }
        
          movies.forEach((movie) => {
            const listItem = document.createElement("li");
        
            const title = document.createElement("h3");
            const movieLink = document.createElement("a");
            movieLink.textContent = movie.title;
            movieLink.href = `https://www.themoviedb.org/movie/${movie.movieId}`;
            movieLink.target = "_blank";
        
            title.appendChild(movieLink);
        
            const thumbnail = document.createElement("img");
            thumbnail.src = movie.thumbnail;
        
            listItem.appendChild(title);
            listItem.appendChild(thumbnail);
        
            moviesList.appendChild(listItem);
          });
        }
        // if (response && response.publications) {
        //   const publications = response.publications;
        //   const publicationsList = document.getElementById("publicationsList");
        //   publicationsList.innerHTML = "";

        //   const queryElement = document.createElement("p");
        //   queryElement.textContent = searchQuery;
        //   publicationsList.appendChild(queryElement);

        //   if (publications.length === 0) {
        //     const noPublications = document.createElement("p");
        //     noPublications.textContent = "No publications found.";
        //     publicationsList.appendChild(noPublications);
        //   }

        //   publications.forEach((publication) => {
        //     const listItem = document.createElement("li");

        //     const title = document.createElement("h3");
        //     const publicationLink = document.createElement("a");
        //     publicationLink.textContent = publication.title;
        //     publicationLink.href = publication.url;
        //     publicationLink.target = "_blank";

        //     title.appendChild(publicationLink);

        //     listItem.appendChild(title);

        //     publicationsList.appendChild(listItem);
        //   });
        // }
      });
  });
}); 