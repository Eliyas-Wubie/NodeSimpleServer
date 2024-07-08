const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (message) => {
        console.log('Received message:', message);
        // Echo the message back to the client
        socket.emit('message', `Echo: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
