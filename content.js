// get highlighted string to make CosDNA search query request
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	var selection = window.getSelection().toString();
      /** can replace the following code with string.encodeURI method **/
   	  /*
   	  var symbols = {
	    '@': '%40',
	    '&': '%26',
	    '*': '%2A',
	    '+': '%2B',
	    '/': '%2F',
	    '™': '',
	    '<': '%3C',
	    '>': '%3E'
	  };
	  selection = selection.replace(/[™@*+&\/\<\>]/g, function (m) { return symbols[m]; });
   	  
   	  // split selected string based on spaces or newline 
   	  var selectionArr = selection.split(/\s+/g);
   	  var cosDNAHref = "http://cosdna.com/eng/product.php?q=";
   	  var i;
   	  for (i = 0; i < selectionArr.length; i++) {
   	  	cosDNAHref = cosDNAHref.concat("+", selectionArr[i]);
   	  }*/

   	  selection = encodeURIComponent(selection);

	  /* string actually still works when include URI spaces */
	  selection = selection.replace("%0A", "+"); //dont really need
	  var cosDNAHref = "http://cosdna.com/eng/product.php?q=".concat(selection);

   	  /* send the final href string */
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": cosDNAHref});
    }
  }
);
