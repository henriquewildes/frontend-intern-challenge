angular.module('chaordic').controller('UrlController', function($scope, $http, $routeParams) {

	$scope.carregarLink = function() {

		console.log("Carregar a URL: " + $routeParams.shortUrl );
	}

});