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
const { sequelize } = require('./api/models');

/**
 * Creates an Express app with Socket.IO support and serves static files from the public directory.
 */
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const public = path.join(__dirname, '../public');
// app.use(express.static(public));
app.use(express.json());
const routes = require('./api/routes/index');
app.use('/', routes);
// io.on('connection', (socket) => {
//   socket.emit('message', `User with socketID ${socket.id} has joined`);
// });

const errorMiddleware = require('./api/middlewares/error.middleware');
app.use(errorMiddleware);

/**
 * Sets up the database and starts the server.
 * @function main
 */
async function main() {
  await sequelize.sync({ force: true });

  // Start the server and listen on port
  server.listen(port, () => {
    console.log('server running on port 3000');
  });
}

// Call the main function to start the server
main();
