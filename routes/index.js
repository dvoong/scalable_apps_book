var util = require('../middleware/utilities');

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;

function index(req, res){
    res.cookie('IndexCookie', 'This was set from Index');
    res.render('index', {
	title: 'Index'
    });
};

function login(req, res){
    res.render('Login', {title: 'Login'});
};

function loginProcess(req, res){
    var isAuth = util.auth(req.body.username, req.body.password, req.session);
    if(isAuth){
	res.redirect('/chat');
    } else {
	res.redirect('/login');
    }
};

function chat(req, res){
    res.render('Chat', {title: 'Chat'});
};
