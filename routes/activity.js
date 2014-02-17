var bc = require('../bootcards-functions.js');

exports.list = function(req, res) {
	res.renderPjax('activities', {
  		activities: activities,
   		menu: bc.getActiveMenu(menu, 'activities')
  	});
};

exports.add = function(req, res) {

	var contact = bc.getContactById(req.params.contactId);

	res.renderPjax('activity_edit', {
  		activities: activities,
  		activity : {
  			date : new Date()
  		},
  		contact: contact,
   		menu: bc.getActiveMenu(menu, 'activities')
  	});
};

exports.save = function(req, res) {

	//retrieve the parent contact
	var contact = bc.getContactById(req.params.contactId);

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
		   	menu: bc.getActiveMenu(menu, 'activities'),
		    contact: contact
		});
	}

}

