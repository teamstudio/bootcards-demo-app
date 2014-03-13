var bc = require('../bootcards-functions.js');

exports.list = function(req, res){

	res.renderPjax('settings', {
  		menu: bc.getActiveMenu(menu, 'settings')
	});

};