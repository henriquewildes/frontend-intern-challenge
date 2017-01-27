(function() {


	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyChx9E_oWnfgSPtYmQhXmrtFbMd4mqZJdU",
		authDomain: "encurtadorchaordic.firebaseapp.com",
		databaseURL: "https://encurtadorchaordic.firebaseio.com",
		storageBucket: "encurtadorchaordic.appspot.com",
		messagingSenderId: "549214079813"
	};

	firebase.initializeApp(config);

	// var links = [{"id": "23094", "hits": 1003, "url": "http://globo.com", "shortUrl": "http://chr.dc/9dtr4"}, 
 //        {"id": "76291", "hits": 1922, "url": "http://google.com", "shortUrl": "http://chr.dc/aUx71"}, 
 //        {"id": "66761", "hits": 765, "url": "http://terra.com.br", "shortUrl": "http://chr.dc/u9jh3"}, 
 //        {"id": "70001", "hits": 1519, "url": "http://facebook.com", "shortUrl": "http://chr.dc/qy61p"}, 
 //        {"id": "21220", "hits": 311, "url": "http://diariocatarinense.com.br", "shortUrl": "http://chr.dc/87itr"}, 
 //        {"id": "10743", "hits": 722, "url": "http://uol.com.br", "shortUrl": "http://chr.dc/y81xc"}, 
 //        {"id": "19122", "hits": 1320, "url": "http://chaordic.com.br", "shortUrl": "http://chr.dc/qy5k9"}, 
 //        {"id": "55324", "hits": 997, "url": "http://youtube.com", "shortUrl": "http://chr.dc/1w5tg"}, 
 //        {"id": "70931", "hits": 487, "url": "http://twitter.com", "shortUrl": "http://chr.dc/7tmv1"}, 
 //        {"id": "87112", "hits": 130, "url": "http://bing.com", "shortUrl": "http://chr.dc/9opw2"}];

	angular.module('chaordic', ['firebase'])
	.controller('LinksController', function($scope, $firebaseArray) {

		var linksRef = firebase.database().ref('links');

		$scope.listarLinks = function() {
            // console.log(links);
            // $scope.links = links;

            // Adiciona ouvinte no grupo Links do Firebase
            linksRef.on('value', function() {
  				$scope.links = $firebaseArray(linksRef);
  			});
        };


        $scope.criarLink = function() {

        	// O timestamp servirá como ID para cada novo Link.
        	var timestamp = new Date().getTime();
            var novoLink = {
                id : timestamp.toString(),
                hits : 0,
                url : $scope.url,
                shortUrl : "teste.com"
            };

            // Enviar novo Link p/ Firebase
            var novoLinkRef = linksRef.push();
            novoLinkRef.set(novoLink)
            .then(function() {
            	console.log("Registrado com sucesso.")
            })
            .catch(function(error) {
            	console.log("Registro não sucedido.");
            	console.log(error);
            })

            // links.push(novoLink);
            // $scope.listarLinks();
        };

	});


}());