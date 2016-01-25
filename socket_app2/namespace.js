var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket){
    console.log("connection");
    
    socket.on('join', function(data){
	console.log("received join message");
	console.log("data: " + data);
	socket.username = data.username;
	socket.broadcast.emit('join', {username: socket.username, socket: socket.id});
    });

    socket.on('ping', function(){
	socket.broadcast.emit('ping', {username: socket.username});
    });

    socket.on('privatePing', function(data){
	console.log('privatePing');
	console.log(data);
	console.log('io.sockets.connected');
	console.log(io.sockets.connected);
	console.log('');
	io.sockets.connected[data.socket].emit(
	    'ping', {username: socket.username, priv: true}
	);
    });
    
});

io.of('/vip').on('connection', function(socket){
    console.log("vip.connection");
    
    socket.on('join', function(data){
	socket.username = data.username;
	socket.broadcast.emit('join', {username: data.username, socket: socket.id});
    });

    socket.on('ping', function(){
	socket.broadcast.emit('ping', {username: socket.username});
    });

    socket.on('privatePing', function(data){
	console.log('vip.privatePing');
	io.of('/vip')
	    .connected[data.socket]
	    .emit('ping', {username: socket.username, priv: true});
    });
    
});

