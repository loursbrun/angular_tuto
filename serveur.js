
var http = require("http");
var fs = require("fs");

var mime = require("mime"); // installer le module mime depuis la console à la racine du projet , avec "npm install mime"

var connect = require("connect"); // installer le module connect depuis la console à la racine du projet , avec "npm install connect"

var serveStatic = require("serveStatic"); // Middlewere sous forme de module static  connect serveStatic  : "npm install serve-static"

var PORT = 8080;


var envoieFichier = function(res, url ) {
    console.log("envoie fichier :" + url);

    var path = __dirname + "/" + url;
    fs.stat(path, function(err, stats){
        if(!err && stats.isFile() ) {

            var flux = fs.createReadStream(path, {
                   flags: "r",
                    autoClose: true
                });

            var typeMime = mime.lookup(path);

            res.writeHead(200, {"Content-Type": typeMime})
            flux.pipe(res);
        } else {
            envoie404(res);
        }
    })


}

var envoie404 = function(res) {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.end("<h1>Page introuvable</h1>");
}


var app = connect();



app.use(function(req,res, next){
    if(req.url == "/") {
        res.writeHead(301, {"Location": "index.html"});
        res.end();
    } else {
     next();
    }
});


app.use(function(req,res){
        envoieFichier(res,req.url);
});





http.createServer(app).listen(PORT);







/*http.createServer(function(req, res) {

    if(req.url == "/") {
        res.writeHead(301, {"Location": "index.html"});
        res.end();
    }
    else  {
        envoieFichier(res,req.url);
    }



}).listen(PORT); */

console.log("Serveur démaré sur le port :" + PORT);

