
module.exports = function(app) {

	app.get('/:shortUrl', api.buscarLink);
	
};