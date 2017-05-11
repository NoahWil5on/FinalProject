var http = require("http");
var htmlHandler = require("./htmlResponses.js");
var jsonHandler = require("./jsonResponses.js");
var cssHandler = require("./cssResponses.js");
var imageHandler = require("./imageResponses.js");

var port = process.env.PORT || 3000;

var onRequest = function(request, response){
    console.log(request.url);
    
    switch(request.url){
        case '/':
            htmlHandler.getIndex(request, response);
            break;
        case '/page2':
            htmlHandler.getPage2(request, response);
            break;
        case '/helloJSON':
            jsonHandler.getHelloJSON(request, response);
            break;
        case '/timeJSON':
            jsonHandler.getTimeJSON(request, response);
            break;
        case '/css/main.css':
            cssHandler.getCSS(request,response);
            break;
        default:
            htmlHandler.getIndex(ogRequest, response);  
            break;
    }
};

http.createServer(onRequest).listen(port);

console.log("Listening on localhost: " + port);