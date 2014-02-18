var bc = require('../bootcards-functions.js');
var moment	= require('moment');

exports.list = function(req, res) {
	res.renderPjax('activities', {
  		activities: activities,
  		activity : activities[0],
   		menu: bc.getActiveMenu(menu, 'activities')
  	});
};

exports.read = function(req, res) {

	res.renderPjax('activity', {
	 	activities : activities,
	   	activity: bc.getActivityById(req.params.id),
	    menu: bc.getActiveMenu(menu, 'activities')
	});
   
}

exports.edit = function(req, res) {

	res.renderPjax('activity_edit', {
	 	activities : activities,
	   	activity: bc.getActivityById(req.params.id),
	    menu: bc.getActiveMenu(menu, 'activities')
	});
   
}

/*an activity can be added to a contact or company*/
exports.add = function(req, res) {

	var contact = bc.getContactById(req.params.contactId);

	res.renderPjax('activity_edit', {
  		activities: activities,
  		activity : {
  			date : new Date(),
  			isNew : true
  		},
  		contact: contact,
   		menu: bc.getActiveMenu(menu, 'activities')
  	});
};

exports.save = function(req, res) {

	console.log(' save activ' + req.params.id);
	//retrieve the parent contact
	var contact = bc.getContactById(req.body.contactId);

	if (contact != null) {
		//found the contact: add new activity

		var activity = {
			type: req.body.type,
			subject: req.body.subject,
			date: moment(req.body.date),
			parentIds : [contact.id]
		}

		activities.push(activity);

		res.renderPjax('contact', {
		 	contacts:contacts,
		   	menu: bc.getActiveMenu(menu, 'activities'),
		    contact: contact,
		    activities : bc.getActivitiesForParent(contact.id),
		});
	}

}

