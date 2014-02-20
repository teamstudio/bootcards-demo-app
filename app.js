
/*
 * Bootcards demo application
 */

var express = require('express');

//routes
var routes 		= require('./routes');
var company 	= require('./routes/company')
var contact 	= require('./routes/contact');
var activity 	= require('./routes/activity');
var media 		= require('./routes/media');
var tests 		= require('./routes/tests');

var pjson = require('./package.json');		//read the package.json file to get the current version

var bc 			= require('./bootcards-functions');		//bootcards functions

var http 	= require('http');
var path 	= require('path');			//work with paths
var fs 		= require('fs');			//work with filesystem
var pjax 	= require('express-pjax');	//express pjax (partial reloads)
var hbs 	= require('express-hbs');	//express handlebars
var moment	= require('moment');		//moment date formatting lib
var app 	= express();

//enable Express session support
app.use( express.cookieParser() );
app.use( express.session({secret : 'QWERTY'}));

app.set('port', process.env.PORT || 3000);
app.engine( 'html', hbs.express3({
	partialsDir : __dirname + '/views'
}));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//pjax middleware for partials
app.use(pjax());

//send session info to handlebars, check OS used to send correct stylesheet
app.use(function(req, res, next){

	var ua = req.headers['user-agent'];
	req.session.isAndroid = (ua.match(/Android/i) != null);
	req.session.isIos = (ua.match(/iPhone|iPad|iPod/i) != null);

	res.locals.session = req.session;

	next();
});

app.use(express.favicon());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

//public dir for bower components
app.use('/bower_components', express.static(__dirname + '/bower_components'));

//register a helper for date formatting using handlebars
hbs.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    f = "ddd DD MMM YYYY HH:mm"
    return moment(datetime).format(f);
  }
  else {
    return datetime;
  }
});

//helper to get the icon for a item type
hbs.registerHelper("getIconForType", function(type) {
	return bc.getIconForType(type);
});

//helper to get the stylesheet for the current user agent
hbs.registerHelper("getCSSforOS", function(session) {
	if (session.isAndroid) {
		return '<link href="/bootcards/css/bootcards-android.css" rel="stylesheet" type="text/css" />';
	} else if (session.isIos) {
		return '<link href="/bootcards/css/bootcards-ios.css" rel="stylesheet" type="text/css" />';
	} else {
		return '<link href="/bootcards/css/bootcards-desktop.css" rel="stylesheet" type="text/css" />';
	}
});

//helper to get the app version
hbs.registerHelper("getAppVersion", function() {
	return pjson.version;
})

//read sample data
companies = [];
activities = [];
contacts = [];

var dataFile = __dirname + '/data/data.json';
fs.readFile(dataFile, 'utf8', function (err, data) {

	if (err) {
		console.log('Error reading data file: ' + err);
		return;
	}

  var jsonContents = JSON.parse(data);

  contacts = jsonContents.contacts;
  companies = bc.sortByField( jsonContents.companies, 'name');
  activities = jsonContents.activities;

  console.log("Sample data read. Found " + contacts.length + " contacts, " + companies.length + " companies, " + activities.length + " activities");

});

//setup menu
menu = [
	{ id : 'companies', name : "Companies", icon : "fa-building-o", active : false, url : '/companies'},
	{ id : 'contacts', name : "Contacts", icon : "fa-users", active : true, url : '/contacts'},
	{ id : 'activities', name : "Activities", icon : "fa-calendar", active : false, url : '/activities'},
	{ id : 'media', name : "Media", icon : "fa-film", active : false, url : '/media'},
	{ id : 'tests', name : "Tests", icon : "fa-gears", active : false, url : '/tests'}
];

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes
app.get('/', contact.list);

app.get('/companies', company.list);
app.get('/companies/:id', company.read);
app.put('/companies/:id', company.save);
app.get('/companies/:id/edit', company.edit);

app.get('/contacts', contact.list);
app.get('/contacts/:id', contact.read);
app.put('/contacts/:id', contact.save);
app.get('/contacts/:id/edit', contact.edit);
app.get('/contacts/add/:companyId', contact.add);

app.get('/activities', activity.list);
app.get('/activities/:id', activity.read);
app.get('/activities/:id/edit', activity.edit);
app.get('/activities/add/:contactId', activity.add);
app.put('/activities', activity.save);

app.get('/media', media.list);

app.get('/tests', tests.list);

http
	.createServer(app)
	.listen(app.get('port'), function(){
  		console.log('Bootcards demo app listening on port ' + app.get('port'));
	}
);
