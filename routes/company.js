var bc = require('../bootcards-functions.js');
var moment	= require('moment');

exports.list = function(req, res) {

	var firstId = companies[0].id;

	res.renderPjax('companies', {
		companies : companies,
		company : bc.getCompanyById(firstId),
   		menu: bc.getActiveMenu(menu, 'companies')
	});
};

exports.read = function(req, res) {

	res.renderPjax('company', {
	 	companies : companies,
	   	menu:menu,
	   	company: bc.getCompanyById(req.params.id),
	    menu: bc.getActiveMenu(menu, 'companies')
	});
   
}

exports.add = function(req, res) {

	res.renderPjax('company_edit', {
  		companies:companies,
  		company : {
  			isNew : true
  		},
   		menu: bc.getActiveMenu(menu, 'companies')
  	});

};

exports.edit = function(req, res) {

	res.renderPjax('company_edit', {
	 	companies : companies,
	   	menu: bc.getActiveMenu(menu, 'companies'),
		company: bc.getCompanyById(req.params.id)
	});
   
}

exports.save = function(req,res) {

	var company = bc.getCompanyById(req.params.id);

	if (company != null) {
		//found the company: update it
		company.name = req.body.name;
		company.city = req.body.city;
		company.country = req.body.country;
		company.email = req.body.email;
		company.phone = req.body.phone;
		company.type = req.body.type;
		company.website = req.body.website;
		company.location = req.body.location;
	}

	res.renderPjax('companies', {
	 	companies : companies,
	   	menu: bc.getActiveMenu(menu, 'companies'),
	    company: company
	});

}

/* ACTIVITIES */

exports.listActivities = function(req, res) {

	res.renderPjax('activities_for_company', {
  		company : bc.getCompanyById(req.params.id)
	});

}

exports.readActivity = function(req, res) {

	var company = bc.getCompanyById( req.params.id);
	company.isCompany = true;

	res.renderPjax('company_activity', {
		company : company,
  		activity : bc.getActivityById( req.params.activityId)
	});
}
exports.editActivity = function(req, res) {

	var company = bc.getCompanyById( req.params.id);
	company.isCompany = true;

	var activity = bc.getActivityById( req.params.activityId);

	res.renderPjax('company_activity_edit', {
		company : company,
		activity : activity
	});
}
exports.addActivity = function(req, res) {
	
	var company = bc.getCompanyById(req.params.id);

	res.renderPjax('company_activity_edit', {
  		company: company,
  		activity : {
  			date : moment().format("DD/MM/YYYY HH:mm"),
  			isNew : true
  		}
	});
}

exports.saveActivity = function(req, res) {

	var activity;
	var company = bc.getCompanyById(req.params.id);

	if (req.params.activityId) {

		activity = bc.getActivityById(req.params.activityId);
		activity.type = req.body.type;
		activity.subject = req.body.subject;
		activity.date = moment(req.body.date, "DD/MM/YYYY HH:mm");

	} else {

		activity = {
			id: bc.getUniqueId(),
			parentIds : [req.params.id],
			type: req.body.type,
			subject: req.body.subject,
			date: moment(req.body.date, "DD/MM/YYYY HH:mm")
		}

		activities.push(activity);
		company.activities.push(activity);

	}

	if (company != null) {

		res.renderPjax('activities_for_company', {
	  		company : company
		});
	}

}


exports.addContact = function(req, res) {
	
	var company = bc.getCompanyById(req.params.id);

	res.renderPjax('contact_edit', {
  		company: company,
  		contact : {
  			isNew : true

  		}
	});
}