/**
 * This module sets up an Express server with 
   Socket.IO and a PostgreSQL database using Sequelize. 
   It loads all the necessary modules and 
   starts the server on a specified port. 
   This module serves as the root of the application
 * @module server
 */

const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 3000;

// Importing database models
const { sequelize, User } = require('./api/models');

/**
 * Creates an Express app with Socket.IO support and serves static files from the public directory.
 */
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const public = path.join(__dirname, '../public');
app.use(express.static(public));

// Code bellow just for testing (Remove later)
io.on('connection', (socket) => {
  socket.emit('message', `User with socketID ${socket.id} has joined`);
});
// Code above just for testing (Remove later)

/**
 * Sets up the database and starts the server.
 * @function main
 */
async function main() {
  await sequelize.sync({ force: true });
  // Code bellow just for testing (Remove later)
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
  // Code above just for testing (Remove later)

  // Start the server and listen on port
  server.listen(port, () => {
    console.log('server running on port 3000');
  });
}

// Call the main function to start the server
main();
