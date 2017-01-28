angular.module('chaordic').controller('UrlController', function($scope, $http, $routeParams) {

	$scope.notFound = false;

	$scope.carregarLink = function() {

		console.log("Carregar a URL: " + $routeParams.shortUrl);

		if ($routeParams.shortUrl) {

			$http.get('/v1/links/' + $routeParams.shortUrl)
			.then(function(link) {

				if (link.data) {
					window.location.href = link.data.url;
				}
				else {
					$scope.notFound = true;
					console.log('Link não existe.');
				}
				
			});
		}
	}

});