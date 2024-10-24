// server.js
const WebSocket = require('ws');

// Create a WebSocket server
const server = new WebSocket.Server({ port: 3000 }); // Change port as needed

server.on('connection', (ws) => {
    console.log('New client connected');

    // Send a welcome message to the connected client
    ws.send('Welcome to the WebSocket server!');

    // Receive messages from the client
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Echo the message back to the client
        ws.send(`Server received: ${message}`);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
