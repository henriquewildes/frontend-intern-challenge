var api = {};

var firebase = require("firebase");

var config = {
	apiKey: "AIzaSyChx9E_oWnfgSPtYmQhXmrtFbMd4mqZJdU",
	authDomain: "encurtadorchaordic.firebaseapp.com",
	databaseURL: "https://encurtadorchaordic.firebaseio.com",
	storageBucket: "encurtadorchaordic.appspot.com",
	messagingSenderId: "549214079813"
};

firebase.initializeApp(config);

var chaordicDatabase = firebase.database();
var linksRef = chaordicDatabase.ref('links');
var shortsRef = chaordicDatabase.ref('shorts');


api.linkar = function(req, res) {

	res.json({
		id: 2,
		nome: 'wildes'
	});	
}

api.buscarLink = function(req, res) {

	var shortUrl = req.params.shortUrl;

	
	// URL compactada estática
	shortsRef.child(shortUrl).once('value').then(function(snap) {
		res.json(snap.val());
	});

	// res.end("Fala tu");

};

// api.listaPorGrupo = function(req, res) {
//     var grupoId = parseInt(req.params.grupoId);
//     db.find({grupo: grupoId}, function(err, doc) {
//         if (err) return console.log(err);
//         res.json(doc);
//     });

// };

module.exports = api;