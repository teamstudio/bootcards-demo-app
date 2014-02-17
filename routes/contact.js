var bc = require('../bootcards-functions.js');

exports.list = function(req, res){

	var firstId = contacts[0].id;

	res.renderPjax('contacts', {
  		contacts : contacts,
  		contact : bc.getContactById(firstId),
   		menu: bc.getActiveMenu(menu, 'contacts')
	});
};

exports.read = function(req, res) {

	res.renderPjax('contact', {
	 	contacts:contacts,
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
  			isNew : true,
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
		contact.jobTitle = req.body.jobTitle;
		contact.department = req.body.department;
		contact.salutation = req.body.salutation;
	}

	res.renderPjax('contacts', {
	 	contacts:contacts,
	   	menu: bc.getActiveMenu(menu, 'contacts'),
	    contact: contact
	});

}