
/**
 * Module dependencies.
 */

var express = require('express');

//routes
var routes = require('./routes');
var company = require('./routes/company')
///var user = require('./routes/user');
var contact = require('./routes/contact');

var http = require('http');
var path = require('path');
var fs = require('fs');
var pjax    = require('express-pjax');
var hbs = require('express-hbs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.engine( 'hbs', hbs.express3({
	partialsDir : __dirname + '/views'
//	defaultLayout : __dirname + '/views/layout'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(pjax());

app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//public dir for bower components
app.use('/bower_components', express.static(__dirname + '/bower_components'));

//data files

//read contacts
var contactsFile = __dirname + '/data/contacts.json';
fs.readFile(contactsFile, 'utf8', function (err, data) {
  if (err) {
    console.log('Error reading contacts file: ' + err);
    return;
  }
 contacts = JSON.parse(data);
});

//setup menu
menu = [
	{ name : "Companies", icon : "fa-building-o", active : false, url : '/companies'},
	{ name : "Contacts", icon : "fa-users", active : true, url : '/contacts'},
	{ name : "Activities", icon : "fa-calendar", active : false, url : '/activities'},
	{ name : "Media", icon : "fa-film", active : false, url : '/media'},
	{ name : "Tests", icon : "fa-gears", active : false, url : '/tests'}
];

//companies
companies = [];

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes
app.get('/', contact.list);
app.get('/companies', company.list);
app.get('/contacts', contact.list);
/*
app.get('/contacts/:id', contact.contact);
app.get('/contacts/:id/edit', contact.contactEdit);
app.get('/users', user.list);*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server for Bootcards demo listening on port ' + app.get('port'));
});
