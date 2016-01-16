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
    res.redirect('/');
};

function chat(req, res){
    res.render('Chat', {title: 'Chat'});
};
