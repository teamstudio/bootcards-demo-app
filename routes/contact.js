var bc = require('../bootcards-functions.js');

exports.list = function(req, res){

	var firstContact = contacts[0];
	firstContact.activities[0].date = new Date();

	res.renderPjax('contacts', {
  		contacts:contacts,
  		contact : firstContact,
   		menu: bc.getActiveMenu(menu, 'contacts')
	});
};

exports.read = function(req, res) {

	res.renderPjax('contact', {
	 	contacts:contacts,
	   	menu:menu,
	   	contact: bc.getContactById(req.params.id),
	    menu: bc.getActiveMenu(menu, 'contacts')
	});
   
}

exports.edit = function(req, res) {

	res.renderPjax('contact_edit', {
	 	contacts:contacts,
	   	menu: bc.getActiveMenu(menu, 'contacts'),
		contact: bc.getContactById(req.params.id)
	});
   
}

exports.add = function(req, res) {

	var company = bc.getCompanyById(req.params.companyId);

	res.renderPjax('contact_edit', {
  		contacts:contacts,
  		contact : {
  			companyId : company.id

  		},
   		menu: bc.getActiveMenu(menu, 'activities')
  	});
};

exports.save = function(req,res) {

	var contact = bc.getContactById(req.params.id);

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