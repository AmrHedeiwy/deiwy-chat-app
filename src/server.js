const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const { sequelize, User } = require('./api/models');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const public = path.join(__dirname, '../public');

app.use(express.static(public));

io.on('connection', (socket) => {
  socket.emit('message', `User with socketID ${socket.id} has joined`);
});

async function main() {
  await sequelize.sync({ force: true });
  await User.create({
    Firstname: 'amr',
    Lastname: 'hedeiwy',
    Username: 'Emna',
    Email: 'amr.hedeiwy@gmail.com',
    Password: 'asA21@sdssaas',
  })
    .then((user) => {
      console.log('User created:', user.toJSON());
    })
    .catch((error) => {
      console.error('Error creating user:', error.message);
      console.error('Validation errors:', error.errors);
    });
}
main().then(() => {
  server.listen(3000, () => {
    console.log('server running on port 3000');
  });
});
