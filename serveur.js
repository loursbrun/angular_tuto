
var http = require("http");
var fs = require("fs");

var mime = require("mime"); // installer le module mime depuis la console à la racine du projet , avec "npm install mime"
var express = require("express"); // installer le module connect depuis la console à la racine du projet , avec "npm install connect"

var serviceMails = require(__dirname + "/get-mails.js");

// midldlewares
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require("body-parser");


var serveStatic = require("serve-static"); // Middlewere sous forme de module static  connect serveStatic  : "npm install serve-static"

var PORT = 8080;

serviceMails.genererMails();

var app = express();


app.use(favicon(__dirname + "/favicon.ico"));
app.use(logger(":method :url"));
app.use(serveStatic(__dirname ));



// API
var api = express();

// Récupérer la liste des dossiers
// GET /api/dossiers
api.get("/dossiers", serviceMails.getDossiers);

// Récupérer un dossier
// GET /api/dossiers/idDossier

api.get("/dossiers/:idDossier", serviceMails.getDossier);

// Récupérer un mail
// GET /api/dossier/idDossier/idMail
api.get("/dossiers/:idDossier/:idMail", serviceMails.getMail);


app.use(bodyParser.json());

// Envoyer un mail
// POST /api/envoi
api.post("/envoi", serviceMails.envoiMail);

app.use("/api", api);

http.createServer(app).listen(PORT);

console.log("Serveur démarré sur le port " + PORT);
