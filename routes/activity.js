
exports.list = function(req, res) {
	res.renderPjax('activities', {
  		activities: activities,
   		menu:menu
  	});
};

exports.add = function(req, res) {

//setActiveMenuOption('Contacts');
	var contact = null;

	if (req.params.contactId != null ) {
		for (var i=0; i<contacts.length; i++) {
			if (contacts[i].id == req.params.id) {
				contact = contacts[i];
				break;
			}
		}
	}

	res.renderPjax('activity_edit', {
  		activities: activities,
  		contact: contact,
   		menu:menu
  	});
};

