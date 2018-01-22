var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');


var app = express();

/*
var logger = function(req, res, next){
	console.log('logging ....');
	next();
}

app.use(logger);
*/

//view Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//Set Statis Path
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL VARS
app.use(function(req, res, next){
	res.locals.errors = null;
	next();
	
});

// Express Validator Middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root    = namespace.shift()
		, formParam = root;

	  while(namespace.length) {
	  	formParam += '[' + namespace.shift() + ']';
	  }
	  return {
	  	param : formParam,
	  	msg   : msg,
	  	value : value
	  };
	}
}));
/*
var person = {
	name:'Dil',
	age: 27
}
*/

var users = [
	{
		id: 1,
		first_name: 'Dil',
		last_name: 'Madale',
		email: 'dilmadale@gmail.com',
	},
	{
		id: 2,
		first_name: 'Bil',
		last_name: 'Madale',
		email: 'bilmadale@gmail.com',
	},
	{
		id: 3,
		first_name: 'jil',
		last_name: 'Madale',
		email: 'jilmadale@gmail.com',
	}
]

app.get('/', function(req, res){

	res.render('index', {
		title: 'Customers',
		users: users
	});
// 	res.json(person);
//	res.send('Hello World... Dil Is writing it');
});

app.post('/users/add', function(req, res){

	req.checkBody('first_name', 'First Name is Required').notEmpty();
	req.checkBody('last_name', 'Last Name is Required').notEmpty();
	req.checkBody('email', 'Email is Required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('index', {
		title: 'Customers',
		users: users,
		errors: errors
		});
		console.log('ERRORS');
	}
	else {
	var newUser = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
		}

		console.log('SUCCESS');
	}

	

});

app.listen(3000, function(){
	console.log('Server started on port 3000....');
})