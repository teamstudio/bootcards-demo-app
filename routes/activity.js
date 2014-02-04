
exports.list = function(req, res) {
	res.renderPjax('activities', {
  		activities: activities,
   		menu:menu
  	});
};