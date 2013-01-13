
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Mongoose setup
require('./db');

// Sets up routes
var routes = require('./routes');


///////////////////
// Configuration //
///////////////////

// Add cookieParser and currentUser to middlewares
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(routes.current_user);
    app.use(app.router);
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/create', routes.create);
app.post('/update/:id', routes.update);
app.get('/destroy/:id', routes.destroy);
app.get('/edit/:id', routes.edit);

app.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
