var fs = require('fs');

var css = fs.readFileSync(__dirname + "/../client/Final/css/main.css");

var getCSS = function(request, response){
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.write(css);
    response.end();
}
module.exports.getCSS = getCSS;