angular.module("MailServiceRest", [ "ngResource" ])
    .factory("mailService", function($resource) {

        var URL_API = "http://localhost:8080/api/";

         var resourceRecupMail = $resource(URL_API + "dossiers/:idDossier/:idMail");
         var resourceEnvoiMail = $resource(URL_API + "envoi");

        var resourceMail = $resource(URL_API + "dossiers", null, {
            "getDossiers": { method: "GET", isArray: true },
            "getDossier": { method: "GET", isArray: false, url: URL_API + "dossiers/:idDossier" },
            "getMail": { method: "GET", isArray: false, url: URL_API + "dossiers/:idDossier/:idMail" },
            "envoiMail": { method: "POST", url: URL_API + "envoi" }
        });

        return {
            getDossiers: function() { // renvoie un tableau
                return resourceMail.getDossiers();
            },
            getDossier: function(valDossier) { // renvoie un objet
                return resourceMail.getDossier({ idDossier: valDossier });
            },
            getMail: function(valDossier, idMail) { // renvoie un objet
                return resourceMail.getMail({ idDossier: valDossier, idMail: idMail });
            },
            envoiMail: function(mail) { // ne renvoie rien
                resourceMail.envoiMail(mail, function(reponse) {
                    alert("Le mail a bien été envoyé !");
                }, function(reponse) {
                    alert("Erreur " + reponse.status + " lors de l'envoi du mail : " + reponse.data);
                });
            }
        };
    });