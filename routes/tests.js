var bc = require('../bootcards-functions.js');

exports.list = function(req, res){

	res.renderPjax('tests', {
  		menu: bc.getActiveMenu(menu, 'tests')
	});

};