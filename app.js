  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var log = require('./logger.js');
  var disciplineWS = require('./route/route');
  var env = require('gulp-env');

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

  console.log('Using logger');
  log.logger();

  app.get('/', function(request, response){
    response.send('These are not the droids you are looking for');
  });

  app.use('/discipline', disciplineWS);

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