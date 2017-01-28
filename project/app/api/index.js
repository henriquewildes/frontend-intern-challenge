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

api.buscarLink = function(req, res) {

	// URL compactada estática
	shortsRef.child('1w5tg').once('value').then(function(snap) {
		console.log(snap.val().url);
		console.log("Redirecionar");
	});

};

module.exports = api;