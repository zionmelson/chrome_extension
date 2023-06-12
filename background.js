// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === "getRecommendedVideos") {
//     const query = request.query.replace(/^Query:\s*/, "");
//     console.log("Query:", query); // Log the query to the console

//     const apiKey = "AIzaSyBNnJJ7Pv-fChJU2PzRh_9CSUFJayTYooQ";
//     const newsApiKey = "c7f994db99b04ee28269699753c6056c";
//     const BookApi = "AIzaSyBNnJJ7Pv-fChJU2PzRh_9CSUFJayTYooQ";
//     const tmdb = "b38f8219d323448fbcc5c3ee11ecad42";
//     const ieeeApiKey = "4ktm3rsf4t3d6u4rn3yjcyvu";

//     // fetch random videos, articles, books
//     Promise.allSettled([
//       fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${query}`)
//       .then((response) => response.json()),
//       fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`)
//       .then((response) => response.json()),
//       fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${BookApi}`)
//       .then((response) => response.json()),
//       fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb}&query=${query}`)
//         .then((response) => response.json()),
//       // fetch(`https://ieeexploreapi.ieee.org/api/v1/search/articles?apikey=${ieeeApiKey}&querytext=${query}`)
//       //   .then((response) => response.json())
//     ])
//     .then((results) => {
//       console.log("videos", results[0].value?.items)
//       console.log("articles", results[1].value?.articles)
//       console.log("books", results[2].value?.items)
//       console.log("movies", results[3].value?.results);
//       // console.log("publications", results[4].value?.articles);
    


//       const videos = results[0].value.items?.map((item) => {
//         return {
//           title: item.snippet.title,
//           thumbnail: item.snippet.thumbnails.default.url,
//           videoId: item.id.videoId,
//         };
//       }) || [];
//       shuffleArray(videos);
//       const recommendedVideos = videos.slice(0, 3);


//       // only first 5 articles
//       const articles = results[1].value.articles?.slice(0, 2).map((article) => {
//         return {
//           title: article.title,
//           description: article.description,
//           url: article.url,
//           imageUrl: article.urlToImage,
//         };
//       }) || [];
      
//     // top 5 books
//       const books = results[2].value.items?.slice(0, 1).map((item) => {
//         return {
//           title: item.volumeInfo.title,
//           thumbnail: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192.png?text=No+Cover",
//           bookId: item.id,
//           url: item.volumeInfo.infoLink,
//         };
//       });

//       const movies = results[3].value?.results?.slice(0, 1).map((movie) => {
//         return {
//           title: movie.title,
//           thumbnail: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200x300.png?text=No+Poster",
//           movieId: movie.id,
//           url: `https://www.themoviedb.org/movie/${movie.id}`,
//         };
//       });

//       // const publications = results[4].value?.articles?.map((publication) => {
//       //   return {
//       //     title: publication.title,
//       //     description: publication.abstract || publication.articleNumber,
//       //     url: publication.pdfUrl || publication.htmlUrl,
//       //   };
//       // }) || [];

//       sendResponse({ videos: recommendedVideos, articles, books, movies, query });
//   })
//     .catch((error) => {
//       console.error("Error fetching recommended videos:", error);
//       sendResponse({ error: "Failed to fetch recommended videos" });
//     });

//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   }
//     // Return true to indicate that the sendResponse function will be called asynchronously
//     return true;
//   }
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getRecommendedVideos") {
    const query = request.query.replace(/^Query:\s*/, "");
    // console.log("Query:", query); // Log the query to the console

    const apiKey = "AIzaSyDFl3gMtA6rl8UyvBKD2gOpMFUw9wVvoIs";
    const newsApiKey = "c7f994db99b04ee28269699753c6056c";
    const BookApi = "AIzaSyBNnJJ7Pv-fChJU2PzRh_9CSUFJayTYooQ";
    const tmdb = "b38f8219d323448fbcc5c3ee11ecad42";
    const ieeeApiKey = "4ktm3rsf4t3d6u4rn3yjcyvu";
    const searchkey = "f053ecf0867b93ab982aea4bf0e1177099865234d4472e78a282263ebc6456c8";

    // fetch random videos, articles, books
    Promise.allSettled([
      fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${query}`)
      .then((response) => response.json()),
      fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`)
      .then((response) => response.json()),
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${BookApi}`)
      .then((response) => response.json()),
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb}&query=${query}`)
        .then((response) => response.json()),
      // fetch(`https://ieeexploreapi.ieee.org/api/v1/search/articles?apikey=${ieeeApiKey}&querytext=${query}`)
      //   .then((response) => response.json())
      fetch(`https://serpapi.com/search.json?engine=google&q=${query}&google_domain=google.com&hl=en&api_key=${searchkey}`)
      .then((response) => response.json()),
    ])
    .then((results) => {
      console.log("videos", results[0].value?.items)
      // console.log("articles", results[1].value?.articles)
      console.log("books", results[2].value?.items)
      // console.log("movies", results[3].value?.results);
      console.log('links', results[4].value?.organic_results);
      // console.log("publications", results[4].value?.articles);
    


      const videos = results[0].value.items?.map((item) => {
        return {
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
          videoId: item.id.videoId,
        };
      }) || [];
      shuffleArray(videos);
      const recommendedVideos = videos.slice(0, 3);


      // only first 5 articles
      // const articles = results[1].value.articles?.slice(0, 2).map((article) => {
      //   return {
      //     title: article.title,
      //     description: article.description,
      //     url: article.url,
      //     imageUrl: article.urlToImage,
      //   };
      // }) || [];
      
    // top 5 books
      const books = results[2].value.items?.slice(0, 1).map((item) => {
        return {
          title: item.volumeInfo.title,
          thumbnail: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192.png?text=No+Cover",
          bookId: item.id,
          url: item.volumeInfo.infoLink,
        };
      })|| [];

      // const movies = results[3].value?.results?.slice(0, 1).map((movie) => {
      //   return {
      //     title: movie.title,
      //     thumbnail: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200x300.png?text=No+Poster",
      //     movieId: movie.id,
      //     url: `https://www.themoviedb.org/movie/${movie.id}`,
      //   };
      // });
      const links = results[4].value?.organic_results?.slice(0, 3).map((result) => {
        console.log(result)
        return {
          // title: result.title,
          url: result.link,
          title: result.title,
          
          
        };
      
      })|| [];
      // const publications = results[4].value?.articles?.map((publication) => {
      //   return {
      //     title: publication.title,
      //     description: publication.abstract || publication.articleNumber,
      //     url: publication.pdfUrl || publication.htmlUrl,
      //   };
      // }) || [];

      sendResponse({ videos: recommendedVideos, books,links, query });
  })
    .catch((error) => {
      console.error("Error fetching recommended videos:", error);
      sendResponse({ error: "Failed to fetch recommended videos" });
    });

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
    // Return true to indicate that the sendResponse function will be called asynchronously
    return true;
  }
});

