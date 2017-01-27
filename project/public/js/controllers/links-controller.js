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

		var chaordicDatabase = firebase.database();
		var linksRef = chaordicDatabase.ref('links');
		var shortsRef = chaordicDatabase.ref('shorts');

		// Função que lista os Links registrados no servidor Firebase.
		$scope.listarLinks = function() {
            
            // Adiciona ouvinte no grupo Links do Firebase
            linksRef.on('value', function() {
  				$scope.links = $firebaseArray(linksRef);
  			});
        };


        // Função que gera um novo Link e envia para o servidor Firebase.
        $scope.criarLink = function() {

        	// O timestamp servirá como ID para cada novo Link.
        	var timestamp = new Date().getTime();
            // var novoLink = {
            //     id : timestamp.toString(),
            //     hits : 0,
            //     url : $scope.url,
            //     shortUrl : idToShortLink(timestamp)
            // };

            var links = [{"id": "23094", "hits": 1003, "url": "http://globo.com", "shortUrl": "9dtr4"}, 
				        {"id": "76291", "hits": 1922, "url": "http://google.com", "shortUrl": "aUx71"}, 
				        {"id": "66761", "hits": 765, "url": "http://terra.com.br", "shortUrl": "u9jh3"}, 
				        {"id": "70001", "hits": 1519, "url": "http://facebook.com", "shortUrl": "qy61p"}, 
				        {"id": "21220", "hits": 311, "url": "http://diariocatarinense.com.br", "shortUrl": "87itr"}, 
				        {"id": "10743", "hits": 722, "url": "http://uol.com.br", "shortUrl": "y81xc"}, 
				        {"id": "19122", "hits": 1320, "url": "http://chaordic.com.br", "shortUrl": "qy5k9"}, 
				        {"id": "55324", "hits": 997, "url": "http://youtube.com", "shortUrl": "1w5tg"}, 
				        {"id": "70931", "hits": 487, "url": "http://twitter.com", "shortUrl": "7tmv1"}, 
				        {"id": "87112", "hits": 130, "url": "http://bing.com", "shortUrl": "9opw2"}];

        	for (var i = 0; i < 10; i++) {
        		novoLink = links[i];
        	
	            // Nota: O Firebase adota um modelo não-relacional para o banco de dados,
	            // logo, torna-se necessário criar uma relação entre dois grupos no Firebase.

	            // Registrando novo link no Grupo Links do Firebase
	            linksRef.child(novoLink.id).set(novoLink)
	            .then(function() {
	            	console.log("Registrado com sucesso.");
	            	// Registrando bijeção shortUrl p/ Link no Firebase
	            	
	            })
	            .catch(function(error) {
	            	console.log("Registro não sucedido.");
	            	console.log(error);
	            });

	            shortsRef.child(novoLink.shortUrl).set({id : novoLink.id, url : novoLink.url});

	        }
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