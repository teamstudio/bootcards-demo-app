
exports.getActiveMenu = function(menu, id) {

	for (var i=0; i<menu.length; i++) {
		menu[i].active = (id == menu[i].id ? true : false);
	}

	return menu;

}