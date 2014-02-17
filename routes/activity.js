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
	   	menu:menu,
	   	activity: bc.getActivityById(req.params.id),
	    menu: bc.getActiveMenu(menu, 'activities')
	});
   
}

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
	var contact = bc.getContactById(req.body.contactId);

console.log(contact);

	if (contact != null) {
		//found the contact: add new activity

		var activity = {
			type: req.body.type,
			subject: req.body.subject,
			date: moment(req.body.date),
			parentIds : [contact.id]
		}


console.log(' s' );
		activities.push(activity);
console.log(' saved' );
		res.renderPjax('contact', {
		 	contacts:contacts,
		   	menu: bc.getActiveMenu(menu, 'activities'),
		    contact: contact,
		    activities : bc.getActivitiesForParent(contact.id),
		});
	}

}

