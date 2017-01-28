


module.exports = function(app) {

	var api = app.api.url;

	app.get('/:shortUrl', api.buscarLink);
	
};