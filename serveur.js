
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
app.use(serveStatic(__dirname + "/"));



// API
var api = express();

// Récupérer la liste des dossiers
// GET /api/dossiers
api.get("/dossiers", serviceMails.getDossiers);

// Récupérer un dossier
// GET /api/dossiers/idDossier




api.get("/dossiers/:idDossier", function(req, res) {
    res.send([
        { id: 1, from: "Albator", to: "Rudy", subject: "Je reviens", date: new Date(2014, 2, 20, 15, 30), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id ligula ac sem fringilla mattis. Nullam sodales mi vel semper volutpat. Phasellus lorem leo, luctus a lectus id, posuere aliquet orci. Praesent sit amet ipsum porttitor, tempus odio vel, bibendum mauris. Etiam magna lorem, rhoncus eget euismod ac, lobortis quis." },
        { id: 2, from: "Capitaine Flam", to: "Rudy", subject: "Bisous de l'espace", date: new Date(2014, 3, 18, 16, 12), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur elementum leo. Curabitur luctus, magna a tempor sodales, orci velit dictum magna, nec pharetra turpis ante vehicula ante. Sed sed libero suscipit, rutrum ligula vel, tempor lorem. Phasellus pulvinar dolor ac velit porttitor pulvinar. Mauris felis quam, consequat at <b>mauris</b>." },
        { id: 3, from: "Pikachu", to: "Rudy", subject: "Pika pika !", date: new Date(2014, 2, 15, 16, 12), content: "Pika pika ! Chuuuuuu. Pika pika ! Chuuuuuu. Pika pika ! Chuuuuuu. Pika pika ! Pika pika ? Piiiiika Chuuuuuu. Pika pika ! Pikachu. Pika pika pika." },
        { id: 4, from: "Barbapapa", to: "Rudy", subject: "Hulahup Barbatruc", date: new Date(2014, 2, 15, 14, 15), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur elementum leo. Curabitur luctus, magna a tempor sodales, orci velit dictum magna, nec pharetra turpis ante vehicula ante. Sed sed libero suscipit, rutrum ligula vel, tempor lorem. Phasellus pulvinar dolor ac velit porttitor pulvinar. Mauris felis quam, consequat at <b>mauris</b>." }
    ]);
});

// Récupérer un mail
// GET /api/dossier/idDossier/idMail
api.get("/dossiers/:idDossier/:idMail", function(req, res) {
    res.send({ id: 1, from: "Albator", to: "Rudy", subject: "Je reviens", date: new Date(2014, 2, 20, 15, 30), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id ligula ac sem fringilla mattis. Nullam sodales mi vel semper volutpat. Phasellus lorem leo, luctus a lectus id, posuere aliquet orci. Praesent sit amet ipsum porttitor, tempus odio vel, bibendum mauris. Etiam magna lorem, rhoncus eget euismod ac, lobortis quis." });
});



app.use(bodyParser.json());

// Envoyer un mail
// POST /api/envoi
api.post("/envoi", function(req, res) {
    res.send({ succes: true, email: req.body });
});


app.use("/api", api);


http.createServer(app).listen(PORT);

console.log("Serveur démaré sur le port :" + PORT);

