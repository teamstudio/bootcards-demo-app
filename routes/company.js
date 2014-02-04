
exports.list = function(req, res) {
	res.renderPjax('companies', {
  	companies:companies,
   	menu:menu
   });
};