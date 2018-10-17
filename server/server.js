const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // Event listeners
  socket.on('join', (params, acknowledge) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return acknowledge('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // socket.leave('foo');
    // io.emit -> io.to('foo').emit
    // socket.broadcast.emit -> socket.broadcast.to('foo').emit
    // socket.emit

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    acknowledge();
  });

  socket.on('createMessage', (message, acknowledge) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    acknowledge('Message received!');
  });

  socket.on('createLocationMessage', (coords) => {
    console.log('createLocationMessage', coords);
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports.app = app;
