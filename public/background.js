chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveRating") {
    // Save the rating and bookmark URL in chrome.storage
    const { rating, url } = message;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const bookmarkTitle = currentTab.title;
      const bookmarkUrl = currentTab.url;

      // Save the bookmark in chrome.bookmarks
      chrome.bookmarks.create({ title: bookmarkTitle, url: bookmarkUrl }, (bookmark) => {
        console.log("Bookmark created:", bookmark);

        // Save the rating and bookmark URL in chrome.storage
        chrome.storage.local.get("bookmarks", (data) => {
          const savedBookmarks = data.bookmarks || [];
          const newBookmark = { rating, url, bookmarkId: bookmark.id };
          const newBookmarks = [...savedBookmarks, newBookmark];
          chrome.storage.local.set({ bookmarks: newBookmarks }, () => {
            console.log("Rating and bookmark saved in local storage:", newBookmarks);
            sendResponse({ success: true });
          });
        });
      });
    });
  }

  if (message.action === "userLogin") {
    const { username, password, url } = message;
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(result => {
      sendResponse({ success: true, access: result.tokens.access, refresh: result.tokens.refresh });
    })
    .catch(_ => {
      sendResponse({ success: false });
    })
  }

  if (message.action === "userRegister") {
    const { username, password, url } = message;
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(_ => {
      sendResponse({ success: true });
    })
    .catch(_ => {
      sendResponse({ success: false});
    })
  }

  if (message.action === "bookmark") {
    // Save the rating and bookmark URL in chrome.storage
    const { url, rating, bookmarkurl, title, keyword, access } = message;
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`
      },
      body: JSON.stringify({
        url: bookmarkurl,
        title: title,
        rating: rating,
        keyword: keyword
      })
    })
    .then(response => response.json())
    .then(result => {
      sendResponse({ success: result.success });
    })
    .catch(_ => {
      sendResponse({ success: false});
    });
  }
  // To allow sending a response asynchronously
  return true;
});
