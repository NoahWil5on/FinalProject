var http = require("http");
var url = require("url");
var fs = require("fs");

var port = process.env.PORT || 3000;

function handler (req, res){
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);
    var typeEnum = 0
    var contentType, fileToLoad;
    var extension = pathname.split('.').pop();
    var file = "client/Final" + pathname;
    var dirs = pathname.split('/');
    if(pathname == "/"){
        file = "client/Final/homeRestaurant.html";
        contentType = 'text/html';
        typeEnum = 2;
    }
    else{
        switch(extension){
            case "jpg":
                contentType = 'image/jpg';
                typeEnum = 1;
                break;
            case "png":
                contentType = 'image/png';
                typeEnum = 1;
                break;
            case "js":
                contentType = 'text/javascript';
                typeEnum = 2;
                break;
            case "css":
                contentType = 'text/css';
                typeEnum = 2;
                break;
            case "html":
                contentType = 'text/html';
                typeEnum = 2;
                break;
            case "ttf":
                contentType = 'application/x-font-ttf';
                typeEnum = 3;
                break;
        }
    }
    switch(typeEnum){
        case 1:
            fileToLoad = fs.readFileSync(file);
            res.writeHead(200, {'Content-Type':  contentType });
            res.end(fileToLoad, 'binary');
            break;
        case 2:
            fileToLoad = fs.readFileSync(file, "utf8");
            res.writeHead(200, {'Content-Type':  contentType });
            res.write(fileToLoad);
            res.end();
            break;
        case 3:
            fileToLoad = fs.readFileSync(file);
            res.writeHead(200, {'Content-Type':  contentType });
            res.write(fileToLoad);
            res.end(fileToLoad,"binary");
            break
        default:
            break;
    }
};
    
http.createServer(handler).listen(port);