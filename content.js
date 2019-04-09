// get highlighted string to make CosDNA search query request

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	var selection = window.getSelection().toString();
   	  selection = encodeURIComponent(selection);

  	  /* string actually still works when include URI spaces */
  	  selection = selection.replace("%0A", "+"); 
  	  var cosDNAHref = "http://cosdna.com/eng/product.php?q=".concat(selection);

   	  /* send the final href string */
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": cosDNAHref});
    }
  }
);
