  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var discipline_ws = require('./route/disciplines_route');
  var user_ws = require('./route/users_route');
  //var log = require('./logger.js');
  //var discipline_ws = require('./route/disciplines_route');
  var apiVersion = 'v1.0';
  var prefix = 'api';
  var api_prefix = `/${prefix}/${apiVersion}/`; //'template literal syntax' is only available in ES6 (use 'esversion: 6').
  // var env = require('gulp-env');

  //Middleware
  var allowCrossDomain = function(req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
  	next();
  };

	app.use(allowCrossDomain);
	// parse application/json
	app.use(bodyParser.json());

	// parse application/vnd.api+json as json
	app.use(bodyParser.json({type: 'application/vnd.api+json'}));

	//app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  app.get(api_prefix, function(request, response){
    response.send('These are not the droids you are looking for');
  });

  app.use(api_prefix+'discipline', discipline_ws);
  app.use(api_prefix+'user', user_ws);

  // process.env.NODE_ENV = 'production';
  // process.env.PORT = '3001';
  // console.log(process.env.NODE_ENV);

  var port = process.env.PORT;
  console.log('Port is: ', process.env.PORT);
   //(process.env.PORT === undefined) ? 3000 : process.env.PORT;
  console.log('Environment is: ', process.env.NODE_ENV);
  app.listen(port, function(){
    console.log('Running on port ' + port);
  });