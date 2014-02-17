console.log("loading");

exports.getActiveMenu = function(menu, id) {

	for (var i=0; i<menu.length; i++) {
		menu[i].active = (id == menu[i].id ? true : false);
	}

	return menu;

}

exports.getIconForType = function(type) {

	switch (type) {
	
	case "company":
		return "fa-building-o";
	case "contact":
		return "fa-user-o";
	case "document":
		return "fa-paperclip";
	case "letter":
		return "fa-file-o";
	case "ticket":
		return "fa-medkit";
	case "phone":
		return "fa-phone-square";
	case "opportunity":
		return "fa-bar-chart-o";
	case "visit":
		return "fa-users";
	case "info":
		return "fa-info-circle";
	case "mail":
		return "fa-edit";
	case "offer":
		return "fa-file-o";
	default:
		return "fa-file-o";
	}

}

exports.getContactById = function(id) {

	if (id != null ) {
		for (var i=0; i<contacts.length; i++) {
			if (contacts[i].id == id) {
				return contacts[i];
			}
		}
	}

	return null;

}

exports.getCompanyById = function(id) {
	
	if (id != null ) {
		for (var i=0; i<companies.length; i++) {
			if (companies[i].id == id) {
				return companies[i];
			}
		}
	}

	return null;

}