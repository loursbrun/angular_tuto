/**
 * Created by fabienbrun on 22/01/16.
 */
angular.module("MailServiceHttp", [])
    .factory("mailService", function($http) {


        var URL_API = "http://localhost:8080/api/";

        return {
            getDossiers:function(){  // renvoie un tableau
                var promesse = $http.get(URL_API + "dossiers");
                var resultat = [];

                promesse.then(function(reponse){
                    angular.extend(resultat, reponse.data);
                }, function(erreur) {
                    alert("Erreur" + erreur.status + " dans la récupération des dossiers :" + erreur.data);
                });

                return resultat;
            },
            getDossier:function(valDossier){  // rencoie un object
                var promesse = $http.get(URL_API + "dossiers/" + valDossier);
                var resultat = {};

                promesse.then(function(reponse) {
                    angular.extend(resultat, reponse.data);
                }, function(erreur) {
                    alert("Erreur" + erreur.status + " dans la récupération d'un dossier :" + erreur.data);
                });

                return resultat;

            },
            getMail:function(valDossier, idMail){    // renvoie un objet

            },
            envoiMail:function(mail){     // ne renvoie rien

            }

        }
})

