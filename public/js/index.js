const socket = io();

socket.on("message", (message) => {
  document.getElementById("1").innerHTML = message;
});
