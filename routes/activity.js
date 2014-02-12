
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
			if (contacts[i].id == req.params.contactId) {
				contact = contacts[i];
				break;
			}
		}
	}

	res.renderPjax('activity_edit', {
  		activities: activities,
  		activity : {
  			date : new Date()
  		},
  		contact: contact,
   		menu:menu
  	});
};

exports.save = function(req, res) {

	//retrieve the parent contact
	var contact = null;

	if (req.body.contactId != null ) {
		for (var i=0; i<contacts.length; i++) {
			if (contacts[i].id == req.body.contactId) {
				contact = contacts[i];
				break;
			}
		}
	}

	if (contact != null) {
		//found the contact: add new activity

		var activity = {
			type: req.body.type,
			subject: req.body.subject,
			date: moment(req.body.date)
		}

		contact.activities.push(activity);

		res.renderPjax('contact', {
		 	contacts:contacts,
		   	menu:menu,
		    contact: contact
		});
	}

}

