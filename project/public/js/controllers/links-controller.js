angular.module('chaordic').controller('LinksController', function($scope, $firebaseArray) {
	
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyChx9E_oWnfgSPtYmQhXmrtFbMd4mqZJdU",
		authDomain: "encurtadorchaordic.firebaseapp.com",
		databaseURL: "https://encurtadorchaordic.firebaseio.com",
		storageBucket: "encurtadorchaordic.appspot.com",
		messagingSenderId: "549214079813"
	};

	firebase.initializeApp(config);

    $scope.acao = "Encurtar";
    $scope.myUrl = "localhost:3000";

    $(".clear").addClass("hide");
    $(".button").addClass("no-clear");

	// Variaveis de referência ao Database do Firebase
	var chaordicDatabase = firebase.database();
	var linksRef = chaordicDatabase.ref('links');
	var shortsRef = chaordicDatabase.ref('shorts');

    var mostrarToast = function(mensagem) {

        console.log("teste");
        $(".toast").addClass('show');
        $(".toast").text(mensagem);

        setTimeout(function(){ 
            $(".toast").removeClass('show');
        }, 3000);
    }

	// Função que lista os Links registrados no servidor Firebase.
	$scope.listarLinks = function() {
        
        // Adiciona ouvinte no grupo Links do Firebase
        linksRef.on('value', function() {
			$scope.links = $firebaseArray(linksRef);
		});
    };


    $scope.acionarBotao = function() {

    	if ($scope.acao == "Encurtar") {
            criarLink();
        }
    	else 
    		copiarLink();
    }

    // Função que gera um novo Link e envia para o servidor Firebase.
    var criarLink = function() {

        $scope.acao = "Copiar";
    	var url = $scope.url;

    	// Checar se o link possui a inicial 'https://'
    	var https = 'https://';
    	var inicioUrl = url.slice(0,8);
    	if (inicioUrl != https)
    		url = https + url;

    	// O timestamp servirá como ID para cada novo Link.
    	var timestamp = new Date().getTime();

        // Conversão do timestamp para Link compactado
        var shortUrl = idToShortLink(timestamp);

        var novoLink = {
            id : timestamp.toString(),
            hits : 0,
            url : url,
            shortUrl : $scope.myUrl + '/' + shortUrl
        };

        $(".url-input").addClass('esmaecer');
        $(".button").addClass('esmaecer');

        setTimeout(function() {        
            $(".url-input").removeClass('esmaecer');
            $(".url-input").removeClass('normalUrl');
            $(".url-input").val(novoLink.shortUrl);
            $(".url-input").addClass('shortUrl');

            $(".clear").removeClass('hide');

            $(".button").removeClass('no-clear');            
            $(".button").removeClass('esmaecer');
            $(".button").text("Copiar");
        }, 500);

    	
        // Nota: O Firebase adota um modelo não-relacional para o banco de dados,
        // logo, torna-se necessário criar uma relação entre dois grupos no Firebase.

        Registrando novo link no Grupo Links do Firebase
        linksRef.child(novoLink.id).set(novoLink)
        .then(function() {
        	console.log("Registrado com sucesso.");
        })
        .catch(function(error) {
        	console.log("Registro não sucedido.");
        	console.log(error);
        });

        // Gerando bijeção no Firebase
        shortsRef.child(shortUrl).set({id : novoLink.id, url : novoLink.url});
    };


    var copiarLink = function() {
    	var link = document.querySelector('.url-input');
    	var range = document.createRange();

    	range.selectNode(link);
    	window.getSelection().addRange(range);

    	try {
    		var copiado = document.execCommand('copy');
    		if (copiado)
    			mostrarToast('Link copiado')
    		else mostrarToast('Erro ao copiar');
    	} catch(error) {
    		console.log(error);
    	}

    	// Retirar seleção
    	window.getSelection().removeAllRanges();
    }

    $scope.limpar = function() {
        $(".clear").addClass("hide");
        $(".button").addClass("no-clear");
        $(".button").text("Encurtar");
        $(".url-input").removeClass("shortUrl");
        $(".url-input").addClass("normalUrl");
        $scope.acao = "Encurtar";
    }


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