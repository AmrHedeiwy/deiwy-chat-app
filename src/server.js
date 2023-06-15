const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 3000;

// Importing the sequelize instnace
const { sequelize } = require('./api/models');

// Creating an Express app instance, an HTTP server instance, and Socket.io instance
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Settup public path directory
const publicPath = path.join(__dirname, '../public');

// Serve static file from public diectory and parsing request body as json
app.use(express.static(publicPath));
app.use(express.json());

// For testing purposes
io.on('connection', (socket) => {
  console.log(socket.id);
  socket.emit('message', `User with socketID ${socket.id} has joined`);
});

// Importing routes and error handling middleware
const routes = require('./api/routes/index');
const errorMiddleware = require('./api/middlewares/error.middleware');

// Mountion routes and error handling middleware on the app
app.use('/', routes);
app.use(errorMiddleware);

/**
 * setup the PostgreSQL database and start the server.
 *
 * @function main
 */
async function main() {
  // Synchronizing the databsae tables with the models
  await sequelize.sync({ force: true });

  // Starting the server and listening on specifed port
  server.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}

main();
