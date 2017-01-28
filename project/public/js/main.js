
angular.module('chaordic', ['firebase', 'ngRoute'])
.config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		templateUrl: 'partials/main.html',
		controller: 'LinksController'
	});

	$routeProvider.when('/:shortUrl', {
		templateUrl: 'partials/link.html',
		controller: 'UrlController'
	});

	// RESTA TRATAR ERRO 
	$routeProvider.otherwise({redirectTo: '/'});

});