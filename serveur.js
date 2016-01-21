
var http = require("http");
var fs = require("fs");

var mime = require("mime"); // installer le module mime depuis la console à la racine du projet , avec "npm install mime"
var express = require("express"); // installer le module connect depuis la console à la racine du projet , avec "npm install connect"

// midldlewares
var logger = require('morgan');
var favicon = require('serve-favicon');


var serveStatic = require("serve-static"); // Middlewere sous forme de module static  connect serveStatic  : "npm install serve-static"

var PORT = 8080;

var app = express();


app.use(favicon(__dirname + "/favicon.ico"));
app.use(logger(":method :url"));
app.use(serveStatic(__dirname + "/"));



// API

// Récupérer la liste des dossiers
// GET /api/dossiers
app.get("/api/dossiers", function(req, res) {
    // ...
});

// Récupérer un dossier
// GET /api/dossiers/idDossier
app.get("/api/dossiers/:idDossier", function(req, res) {
    // ...
});

// Récupérer un mail
// GET /api/dossier/idDossier/idMail
app.get("/api/dossier/:idDossier/:idMail", function(req, res) {
    // ...
});

// Envoyer un mail
// POST /api/envoi
app.post("/api/envoi", function(req, res) {
    // ...
});



http.createServer(app).listen(PORT);

console.log("Serveur démaré sur le port :" + PORT);

