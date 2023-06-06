// Listen for link clicks
document.addEventListener("click", function (event) {
  const target = event.target;

  // Check if the clicked element is a link
  if (target.tagName.toLowerCase() === "a") {
    // Retrieve the link's URL
    const url = target.href;

    // Send the URL to the background script
    chrome.runtime.sendMessage(
      { action: "linkClicked", url: url },
      function (response) {
        // Handle the response from the background script
        if (response && response.title) {
          console.log(response.title); // You can modify this line to do something with the title
        } else {
          console.log("Title not available");
        }
      }
    );
  }
});
