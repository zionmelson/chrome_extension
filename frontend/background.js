chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getRecommendedVideos") {
    const query = request.query.replace(/^Query:\s*/, "");
    console.log("Query:", query); // Log the query to the console

    const apiKey = "AIzaSyCRBjlFCTf9y5tOnb4PWJeji-Z50xgoV4M";
    const newsApiKey = "c7f994db99b04ee28269699753c6056c";
    const BookApi = "AIzaSyCRBjlFCTf9y5tOnb4PWJeji-Z50xgoV4M";


    Promise.allSettled([
      fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${query}`)
      .then((response) => response.json()),
      fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`)
      .then((response) => response.json()),
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${BookApi}`)
      .then((response) => response.json()),
    ])
    .then((results) => {
      console.log("videos", results[0].value?.items)
      console.log("articles", results[1].value?.articles)
      console.log("books", results[2].value?.items)
      const videos = results[0].value.items?.slice(0, 4).map((item) => {
        return {
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
          videoId: item.id.videoId,
        };
      }) || [];
      // only first 5 articles
      const articles = results[1].value.articles?.slice(0, 2).map((article) => {
        return {
          title: article.title,
          description: article.description,
          url: article.url,
          imageUrl: article.urlToImage,
        };
      });
    // top 5 books
      const books = results[2].value.items?.slice(0, 2).map((item) => {
        return {
          title: item.volumeInfo.title,
          thumbnail: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192.png?text=No+Cover",
          bookId: item.id,
          url: item.volumeInfo.infoLink,
        };
      });
      sendResponse({ videos, articles, books, query });
  })
    .catch((error) => {
      console.error("Error fetching recommended videos:", error);
      sendResponse({ error: "Failed to fetch recommended videos" });
    });

  //   // Make a request to the YouTube Data API with the modified query
  //   const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${query}`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const videos = data.items.map((item) => {
  //         return {
  //           title: item.snippet.title,
  //           thumbnail: item.snippet.thumbnails.default.url,
  //           videoId: item.id.videoId,
  //         };
  //       });
  //       sendResponse({ videos, query }); // Include the modified query in the response
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching recommended videos:", error);
  //       sendResponse({ error: "Failed to fetch recommended videos" });
  //     });

  //   const newsUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`;
  //   fetch(newsUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const articles = data.articles.map((article) => {
  //         return {
  //           title: article.title,
  //           description: article.description,
  //           url: article.url,
  //           imageUrl: article.urlToImage,
  //         };
  //       });
  //       sendResponse({ articles, query });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching recommended videos:", error);
  //       sendResponse({ error: "Failed to fetch recommended videos" });
  //     });

    // Return true to indicate that the sendResponse function will be called asynchronously
    return true;
  }
  if (request.action === "bookmark") {
    fetch('http://3.131.38.234:8000/mainapp/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": "test@gmail.com",
        "password": "developer2020!A"
      })
    })
    .then(response => response.json())
    .then(data => {
      token = data.tokens.access;
      currentDate = new Date();
      datetime = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + 
                 currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + 
                 ":" + currentDate.getSeconds()

      fetch('http://3.131.38.234:8000/mainapp/bookmark/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          "url": request.url,
          "time": "100",
          "lastVisitDateTime": datetime,
          "frequency": "100",
          "clickCount": "10",
          "level": "5"
        })
      })
    });
  }
});

