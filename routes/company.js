
exports.list = function(req, res) {
	//setActiveMenuOption('Companies');
	res.renderPjax('companies', {
  	companies:companies,
   	menu:menu
   });
};