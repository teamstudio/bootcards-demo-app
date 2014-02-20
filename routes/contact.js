var bc = require('../bootcards-functions.js');
var moment	= require('moment');

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

	var company = (req.params.companyId ? bc.getCompanyById(req.params.companyId) : null);

	res.renderPjax('contact_edit', {
  		contacts:contacts,
  		contact : {
  			isNew : true,
  			companyId : (company ? company.id : null)
  		},
   		menu: bc.getActiveMenu(menu, 'contacts')
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

/* ACTIVITIES */

exports.listActivities = function(req, res) {

	res.renderPjax('activities_for_contact', {
  		contact : bc.getContactById(req.params.id)
	});

}

exports.readActivity = function(req, res) {

	var contact = bc.getContactById( req.params.id);
	contact.isContact = true;

	res.renderPjax('contact_activity', {
		contact : contact,
  		activity : bc.getActivityById( req.params.activityId)
	});
}
exports.editActivity = function(req, res) {

	var contact = bc.getContactById( req.params.id);
	contact.isContact = true;

	var activity = bc.getActivityById( req.params.activityId);

	res.renderPjax('contact_activity_edit', {
		contact : contact,
		activity : activity
	});
}
exports.addActivity = function(req, res) {
	
	var contact = bc.getContactById(req.params.id);

	res.renderPjax('contact_activity_edit', {
  		contact: contact,
  		activity : {
  			date : moment().format("DD/MM/YYYY HH:mm"),
  			isNew : true
  		}
	});
}

exports.saveActivity = function(req, res) {

	var activity;
	var contact = bc.getContactById(req.params.id);

	if (req.params.activityId) {

		activity = bc.getActivityById(req.params.activityId);
		activity.type = req.body.type;
		activity.subject = req.body.subject;
		activity.date = moment(req.body.date, "DD/MM/YYYY HH:mm");
		activity.details = req.body.details;

	} else {

		activity = {
			id: bc.getUniqueId(),
			parentIds : [req.params.id],
			type: req.body.type,
			subject: req.body.subject,
			date: moment(req.body.date, "DD/MM/YYYY HH:mm"),
			details: req.body.details
		}

		activities.push(activity);
		contact.activities.push(activity);

	}

	if (contact != null) {

		res.renderPjax('activities_for_contact', {
	  		contact : contact
		});
	}

}