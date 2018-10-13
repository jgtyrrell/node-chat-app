const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Mike',
    text: 'Hey, what is going on?',
    createdAt: new Date().getTime()
  });

  // Event listeners
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports.app = app;
