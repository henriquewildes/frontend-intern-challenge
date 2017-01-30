angular.module('chaordic').controller('UrlController', function($scope, $http, $routeParams) {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyChx9E_oWnfgSPtYmQhXmrtFbMd4mqZJdU",
		authDomain: "encurtadorchaordic.firebaseapp.com",
		databaseURL: "https://encurtadorchaordic.firebaseio.com",
		storageBucket: "encurtadorchaordic.appspot.com",
		messagingSenderId: "549214079813"
	};

	firebase.initializeApp(config);

	var chaordicDatabase = firebase.database();
	var hitsRef = chaordicDatabase.ref('hits');
	var linksRef = chaordicDatabase.ref('links');
	var shortsRef = chaordicDatabase.ref('shorts');

	$scope.notFound = false;

	var hitsGlobal;

	$scope.carregarLink = function() {

		if ($routeParams.shortUrl) {

			$http.get('/v1/links/' + $routeParams.shortUrl)
			.then(function(link) {

				if (link.data) {

					link.data.hits++;
					var hits = hitsGlobal;

					hitsRef.once('value', function(snap) {
				        hitsGlobal = snap.val();
				        hitsRef.set(hitsGlobal + 1);
				        linksRef.child(link.data.id).update({hits : link.data.hits});
				        shortsRef.child($routeParams.shortUrl).update({hits : link.data.hits})
				        .then(function() {							        	
				            window.location.href = link.data.url;
				        });
				    });			      
				}
				else {
					$scope.notFound = true;
					console.log('Link não existe.');
				}
				
			});
		}
	}

});