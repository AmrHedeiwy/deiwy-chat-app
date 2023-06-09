import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as path from 'path';
const port = process.env.PORT || 3000;

// Importing the sequelize instnace
import db from './api/models/index.js';

// Creating an Express app instance, an HTTP server instance, and Socket.io instance
const app = express();
const server = createServer(app);
const io = new Server(server);

// Settup public path directory
const publicPath = path
  .join(path.dirname(import.meta.url), '../public')
  .replace('file:\\', '');

// Serve static file from public diectory and parsing request body as json
app.use(express.static(publicPath));
app.use(express.json());

// For testing purposes
io.on('connection', (socket) => {
  console.log(socket.id);
  socket.emit('message', `User with socketID ${socket.id} has joined`);
});

// Importing routes and error handling middleware
import routes from './api/routes/index.route.js';
import errorMiddleware from './api/middlewares/error.middleware.js';

// Mountion routes and error handling middleware on the app
app.use(routes);
app.use(errorMiddleware);

/**
 * setup the PostgreSQL database and start the server.
 *
 * @function main
 */
async function main() {
  // Synchronizing the databsae tables with the models
  await db.sequelize.sync({ force: true });
  // Starting the server and listening on specifed port
  server.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}

main();
