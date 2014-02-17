
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
	var contact = getById(contacts, id);
	if (contact != null) {
		contact.activities = getForParent(activities, contact.id);
	}
	return contact;
}
exports.getCompanyById = function(id) {
	var company = getById(companies, id);
	if (company != null) {
		company.activities = getForParent(activities, company.id);
		company.contacts = getForParent(contacts, company.id);
	}
	return company;
}
exports.getActivityById = function(id) {
	return getById(activities, id);
}

exports.getContactsForCompany = function(parentId) {
	return getForParent(contacts, parentId);
}
exports.getActivitiesForParent = function(parentId) {
	return getForParent(activities, parentId);
}

var getForParent = function( from, id) {

	var results = [];

	for (var i=0; i<from.length; i++) {
		var fromEl = from[i];
		for (var j=0; j<fromEl.parentIds.length; j++) {
			if (fromEl.parentIds[j] == id) {
				results.push(fromEl);
				break;
			}
		}
	}
	return results;
}

var getById = function(from, id) {
	if (from == null || from.length==0) {
		return null;
	}

	if (id != null ) {
		for (var i=0; i<from.length; i++) {
			if (from[i].id == id) {
				return from[i];
			}
		}
	}

	return null;
}