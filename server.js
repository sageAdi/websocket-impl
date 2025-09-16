const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.ping( () => {
    ws.send('Pong');
  });
  ws.pong( () => {
    ws.send('Ping');
  });
  ws.on('message', (message) => {



    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);  // Echo back
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});