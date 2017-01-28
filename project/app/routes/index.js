
var api = require('../api');
var path = require('path');

module.exports = function(app) {

	// Habilitar HTML5 Mode
	app.all('/*', function(req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });
	
};