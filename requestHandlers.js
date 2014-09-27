var exec = require("child_process").exec;
var fs = require("fs");
var querystring = require("querystring");

// do NOT return a value from any handler functions
function start(res, postData) {
	console.log("Request handler \'start\' was called.");
	
	/*var body = '<!DOCTYPE HTML>' + 
		'<html>' + 
		'<head>' + 
		'<meta http-equiv="Content-Type" content="text/html; ' +
		'charset=UTF-8" />' + 
		'</head>' + 
		'<body>' + 
		'<form action="/upload" method="post">' + 
		'<textarea name="text" rows="20" cols="60"></textarea>' + // postData is entered in the "text" area
		'<textarea name="name" rows="1" cols="20" clear="both"></textarea>' + // more postData is entered in the "name" area
		'<input type="submit" value="Submit text" />' + 
		'</form>' + 
		'</body>' + 
		'</html>';*/
	
	var body;
	fs.readFile("index.html", function (err, data) {
		if (err) {
			throw err;
		}
		body = data;
		
		res.writeHead(200, {"Content-Type" : "text/html"});
		res.write(body);
		res.end();
	});
	
	/*exec("ls -lah", function (err, stdout, stderr) {
		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.write(stdout);
		res.end();
	}); // non-blocking */
}

function upload(res, postData) {
	console.log("Request handler \'upload\' was called.");
	res.writeHead(200, {"Content-Type" : "text/plain"});
	var text = querystring.parse(postData).text; // querystring is used because there can be more than one field
	var name = querystring.parse(postData).name;
	res.write("You\'ve sent the text: " + text +
		"\nYour name is: " + name);
	res.end();
}

exports.start = start;
exports.upload = upload;