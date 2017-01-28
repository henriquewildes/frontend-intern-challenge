var api = {};

api.buscarLink = function(req, res) {

	res.end(req.params.shortUrl);
};

module.exports();