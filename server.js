var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(req, res) { // req = request, res = response
		var postData = "";
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received."); // Will output twice because browser requests favicon.ico too
		
		req.setEncoding("utf8");
		
		req.addListener("data", function(postDataChunk) { // receive postData in chunks
			postData += postDataChunk;
			console.log("Received POST data chunk \'" +
				postDataChunk + "\'.");
		});
		
		req.addListener("end", function() { // once entire postData is received, route to router
			route(handle, pathname, res, postData);
		});
	}

	http.createServer(onRequest).listen(3000);
	console.log("The server has started.");
}

exports.start = start; // export this file as node.js module