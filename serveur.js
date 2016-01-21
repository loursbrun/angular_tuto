
var http = require("http");
var fs = require("fs");
var PORT = 8080;


var envoieFichier = function(res, path, mineType ) {
    res.writeHead(200, {"Content-type":  mineType});

    var flux = fs.createReadStream(path, {
        flags: "r",
        autoClose: "true"
    });

   // flux.on("data", function (chunk){
   //     res.write(chunk);
   // })
   // flux.on("end", function () {
   //     res.end();
   // })


    // Flux Pipe
    flux.pipe(res);


}



http.createServer(function(req, res) {



    if(req.url == "/") {
        res.writeHead(301, {"Location": "index.html"});
        res.end();
    }
    else if(req.url == "/index.html") {
        envoieFichier(res, __dirname + "/index.html", "text/html");
    } else if (req.url == "/style/style.css") {
        envoieFichier(res, __dirname + "/style/style.css", "text/css");
    } else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1>Page introuvable</h1>");

    }

}).listen(PORT);

console.log("Serveur démaré sur le port :" + PORT);

