exports.list = function(req, res){

	var firstContact = contacts[0];
	firstContact.activities[0].date = new Date();

	//setActiveMenuOption('Contacts');
  res.renderPjax('contacts', {
  	contacts:contacts,
  	contact : firstContact,
   	menu: bc.getActiveMenu(menu, 'contacts')
   });
};

exports.contact = function(req, res) {
	//setActiveMenuOption('Contacts');
	var contact = null;

	if (req.params.id != null ) {
		for (var i=0; i<contacts.length; i++) {
			if (contacts[i].id == req.params.id) {
				contact = contacts[i];
				break;
			}
		}
	}
	
	res.renderPjax('contact', {
	 	contacts:contacts,
	   	menu:menu,
	      contact: contact,
	    menu: bc.getActiveMenu(menu, 'contacts')
	});
   
}

exports.edit = function(req, res) {

	//setActiveMenuOption('Contacts');
	var contact = null;

	if (req.params.id != null ) {
		for (var i=0; i<contacts.length; i++) {
			if (contacts[i].id == req.params.id) {
				contact = contacts[i];
				break;
			}
		}
	}
	
	res.renderPjax('contact_edit', {
	 	contacts:contacts,
	   	menu: bc.getActiveMenu(menu, 'contacts'),
	      contact: contact
	});
   
}

exports.save = function(req,res) {

	var contact = null;

	if (req.params.id != null ) {
		for (var i=0; i<contacts.length; i++) {
			if (contacts[i].id == req.params.id) {
				contact = contacts[i];
				break;
			}
		}
	}

	if (contact != null) {
		//found the contact: update it
		contact.firstName = req.body.firstName;
		contact.lastName = req.body.lastName;
		contact.email = req.body.email;
		contact.phone = req.body.phone;
	}

	res.renderPjax('contacts', {
	 	contacts:contacts,
	   	menu: bc.getActiveMenu(menu, 'contacts'),
	      contact: contact
	});

}