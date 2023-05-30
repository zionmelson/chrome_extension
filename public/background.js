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

  // To allow sending a response asynchronously
  return true;
});
