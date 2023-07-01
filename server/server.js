const io = require('socket.io')(3000, {
    cors: {
        origin: ["http://localhost:8080"],
    },
});

 io.on('connection', socket => {
    console.log(socket.id);
    socket.on('send-message', (message, room) => {

        //Sending message to all the clients 
        // io.emit('receive-message', message);

        //Sending message to all the clients except the sender
        if(room === ''){
        socket.broadcast.emit('receive-message', message);
        }
        else{
            socket.to(room).emit('receive-message', message);
        }
        console.log(message);
    });
    socket.on('join-room', (room,cb) => {
        socket.join(room);
        cb(`Joined ${room}`);
    }
    );
 });