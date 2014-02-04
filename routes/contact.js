function setActiveMenuOption(name) {

	for (var i=0; i<menu.length; i++) {
		menu[i].active = (name == menu[i].name ? true : false);
	}

}

exports.list = function(req, res){

	//setActiveMenuOption('Contacts');
  res.renderPjax('contacts', {
  	contacts:contacts,
  	contact : contacts[0],
   	menu:menu
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
	      contact: contact
	});
   
}

exports.contactEdit = function(req, res) {

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
	
	res.renderPjax('contactEdit', {
	 	contacts:contacts,
	   	menu:menu,
	      contact: contact
	});
   
}