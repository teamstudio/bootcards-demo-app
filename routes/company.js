var bc = require('../bootcards-functions.js');

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
	}

	res.renderPjax('companies', {
	 	companies : companies,
	   	menu: bc.getActiveMenu(menu, 'companies'),
	    company: company
	});

}