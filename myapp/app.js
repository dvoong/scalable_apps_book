var express = require('express');
var app = express();
var routes = require('./routes');
var errorHandlers = require('./middleware/errorhandlers');
var log = require('./middleware/log');
var partials = require('express-partials');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var csrf = require('csurf');
var util = require('./middleware/utilities');
var flash = require('connect-flash');
var config = require('./config');

app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'});

// Middleware
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(partials());
app.use(cookieParser(config.secret));
app.use(session({
    secret: config.secret,
    saveUnitialized: true,
    resave: true,
    store: new RedisStore({url: config.redisUrl})
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
app.use(flash());
app.use(util.templateRoutes);

// Routes
app.get('/', routes.index);
app.get(config.routes.login, routes.login);
app.post(config.routes.login, routes.loginProcess);
app.get('/chat', [util.requireAuthentication], routes.chat);
app.get('/error', function(req, res, next){
    next(new Error('A contrived error'));
});
app.get(config.routes.logout, routes.logout);

// Error Handlers
app.use(errorHandlers.error);
app.use(errorHandlers.notFound);


app.listen(config.port);
console.log("App server running on port " + config.port);
