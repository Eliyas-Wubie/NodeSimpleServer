const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Middleware to read user input from console
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to handle user input
function handleUserInput() {
    rl.question('Enter message to broadcast: ', (message) => {
        // Broadcast message to all connected clients
        io.emit('agent-send-message', message);
        // Continue reading user input
        handleUserInput();
    });
}

// Start reading user input

// Socket.IO event handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle message from client
    socket.on('send-message', (message) => {
        console.log('\nReceived message from client:', message);
        handleUserInput();

    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
