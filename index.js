var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {} // object as associative array to handle requestHandlers in a scalable fashion
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle); // start server