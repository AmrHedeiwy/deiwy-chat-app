const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const public = path.join(__dirname, "../public");

app.use(express.static(public));

io.on("connection", (socket) => {
  socket.emit("message", `User with socketID ${socket.id} has joined`);
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});