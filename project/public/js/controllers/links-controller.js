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


	angular.module('chaordic', ['firebase'])
	.controller('LinksController', function($scope, $firebaseArray) {

		var linksRef = firebase.database().ref('links');

		$scope.listarLinks = function() {
            
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
                shortUrl : idToShortLink(timestamp)
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
            });
        };


        // As funções a seguir foram adaptadas do seguinte site de 
        // referência: http://www.geeksforgeeks.org/how-to-design-a-tiny-url-or-url-shortener/

        // Esta função se resume em converter o ID, anteriormente determinado pelo timestamp em que o link foi criado,
        // da base 10 para a base 62 (a quantidade de caracteres possíveis entre a-z + A-Z e 0-9), resultando numa
        // URL compactada.
        function idToShortLink(id) {

		    var shortLink = [];

		    var mapa = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		    
		    while (id > 0) {
		        shortLink.push(mapa[id % 62]);
		        id = Math.floor(id / 62);
		    }

		    shortLink.reverse();
		    return shortLink.join("");
		}

		// Esta função retorna o ID de um Link após descompactar a URL, tratando de uma conversão, dessa vez,
		// da base 62 para a base 10.
		function shortLinkToId(shortLink) {

		    var id = 0;
		  
		    for (var i = 0; i < shortLink.length; i++) {
		        if ('a' <= shortLink[i] && shortLink[i] <= 'z' ) {
		            id = id * 62 + shortLink[i].charCodeAt(0) - 'a'.charCodeAt(0);
		        }
		        if ('A' <= shortLink[i] && shortLink[i] <= 'Z' ) {
		            id = id * 62 + shortLink[i].charCodeAt(0) - 'A'.charCodeAt(0) + 26;
		        }
		        if ('0' <= shortLink[i] && shortLink[i] <= '9' ) {
		            id = id * 62 + shortLink[i].charCodeAt(0) - '0'.charCodeAt(0) + 52;
		        }
		    }

		    return id;
		}
	});


}());