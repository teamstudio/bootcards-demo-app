var bc = require('../bootcards-functions.js');

exports.list = function(req, res){

	res.renderPjax('media', {
  		menu: bc.getActiveMenu(menu, 'media')
	});

};