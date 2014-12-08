// BASE SETUP
// =============================================================================

var Person     = require('./app/models/person');
var Place     = require('./app/models/place');
var DateTime     = require('./app/models/datetime');
var Event     = require('./app/models/event');
var Writing     = require('./app/models/writing');
var Picture     = require('./app/models/picture');
var Audio     = require('./app/models/audio');
var Video     = require('./app/models/video');

var mongoose = require('mongoose');
mongoose.connect('mongodb://josephmoore:scrapbook@ds061370.mongolab.com:61370/scrapbook');

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

setRoutes('person');
setRoutes('place');
setRoutes('datetime');
setRoutes('event');
setRoutes('writing');
setRoutes('picture');
setRoutes('audio');
setRoutes('video');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

function getObject(model){
	switch (model) {
		case "person": 
			return new Person();
			break;
		case "place": 
			return new Place();
			break;
		case "datetime": 
			return new DateTime();
			break;
		case "event": 
			return new Event();
			break;
		case "writing": 
			return new Writing();
			break;
		case "picture": 
			return new Picture();
			break;
		case "audio": 
			return new Audio();
			break;
		case "video": 
			return new Video();
			break;
		default:
			return null;
			break;
	}
}

function getClass(model){
	switch (model) {
		case "person": 
			return Person;
			break;
		case "place": 
			return Place;
			break;
		case "datetime": 
			return DateTime;
			break;
		case "event": 
			return Event;
			break;
		case "writing": 
			return Writing;
			break;
		case "picture": 
			return Picture;
			break;
		case "audio": 
			return Audio;
			break;
		case "video": 
			return Video;
			break;
		default:
			return null;
			break;
	}
}

function getIdParam(model, request){
	switch (model) {
		case "person": 
			return request.params.person_id;
			break;
		case "place": 
			return request.params.place_id;
			break;
		case "datetime": 
			return request.params.datetime_id;
			break;
		case "event": 
			return request.params.event_id;
			break;
		case "writing": 
			return request.params.writing_id;
			break;
		case "picture": 
			return request.params.picture_id;
			break;
		case "audio": 
			return request.params.audio_id;
			break;
		case "video": 
			return request.params.video_id;
			break;
		default:
			return null;
			break;
	}
}

function setParams(model, request, object){
	switch (model) {
		case "person": 
			object.name = request.body.name; 	
			object.relation = request.body.relation; 
			object.notes = request.body.notes;  
			break;
		case "place": 
			object.name = request.body.name;
			object.location = request.body.location;
			object.notes = request.body.notes;
			break;
		case "datetime": 
			object.name = request.body.name;
			object.date = request.body.date;
			object.notes = request.body.notes;
			break;
		case "event": 
			object.name = request.body.name; 
			object.people = request.body.people; 
			object.place = request.body.place; 
			object.date = request.body.date; 
			object.media = request.body.media; 
			object.notes = request.body.notes;
			break;
		case "writing": 
			object.name = request.body.name;
			object.content = request.body.content;
			object.notes = request.body.notes;
			break;
		case "picture": 
			object.name = request.body.name;
			object.file = request.body.file;
			object.notes = request.body.notes;  
			break;
		case "audio": 
			object.name = request.body.name; 
			object.file = request.body.file; 
			object.notes = request.body.notes; 
			break;
		case "video": 
			object.name = request.body.name;
			object.file = request.body.file;
			object.notes = request.body.notes;
			break;
		default:
			return null;
			break;
	}
}

function setRoutes(model){
	var obj = getObject(model);
	var classObj = getClass(model);
	router.route('/'+model)
		// create an object (accessed at POST http://localhost:8080/api/<model>)
		.post(function(req, res) {
			setParams(model, req, obj);

			// save the object and check for errors
			obj.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: model+' created!' });
			});
		
		})
		// get all the objects (accessed at GET http://localhost:8080/api/<model>)
		.get(function(req, res) {
			classObj.find(function(err, objs) {
				if (err)
					res.send(err);

				res.json(objs);
			});
		});
		// on routes that end in /<model>s/:<model>_id
		// ----------------------------------------------------
		router.route('/'+ model +'s/:'+ model +'_id')

			// get the object with that id (accessed at GET http://localhost:8080/api/<model>s/:<model>_id)
			.get(function(req, res) {
				classObj.findById(getIdParam(model, req), function(err, obj) {
					if (err)
						res.send(err);
					res.json(obj);
				});
			})
			// update the object with this id (accessed at PUT http://localhost:8080/api/<model>s/:<model>_id)
			.put(function(req, res) {

				// use our object model to find the object we want
				classObj.findById(getIdParam(model, req), function(err, obj) {

					if (err)
						res.send(err);

					setParams(model, req, obj);

					// save the object
					obj.save(function(err) {
						if (err)
							res.send(err);

						res.json({ message: model+' updated!' });
					});

				});
			})
			// delete the object with this id (accessed at DELETE http://localhost:8080/api/<model>s/:<model>_id)
			.delete(function(req, res) {
				classObj.remove({
					_id: getIdParam(model, req)
				}, function(err, obj) {
					if (err)
						res.send(err);

					res.json({ message: 'Successfully deleted' });
				});
			});
}