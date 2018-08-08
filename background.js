//user clicks on the icon
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

//open new tab with CosDNA url from content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);

//contextMenu so user can right click selection
chrome.contextMenus.create({
    "title": "go to CosDNA",
    "contexts": ["selection"],
    "onclick": clickMenu
});

function clickMenu(e) {
  var selection = encodeURIComponent(e.selectionText);

  /* string actually still works when include URI spaces */
  selection = selection.replace("%0A", "+"); //dont really need
  var cosDNAHref = "http://cosdna.com/eng/product.php?q=".concat(selection);

  chrome.tabs.create({"url": cosDNAHref});
}
