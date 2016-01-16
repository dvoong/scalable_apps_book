var express = require('express');
var app = express();
var routes = require('./routes');
var errorHandlers = require('./middleware/errorhandlers');
var log = require('./middleware/log');
var partials = require('express-partials');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var RedisStore = require('connect-redis')(session);

app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'});

// Middleware
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(partials());
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUnitialized: true,
    resave: true,
    store: new RedisStore({
	url: 'redis://localhost'
    })
}));

// Routes
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/chat', routes.chat);
app.get('/error', function(req, res, next){
    next(new Error('A contrived error'));
});

// Error Handlers
app.use(errorHandlers.error);
app.use(errorHandlers.notFound);


app.listen(3000);
console.log("App server running on port 3000");
