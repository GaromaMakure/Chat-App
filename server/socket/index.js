const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

const app = express();

// Socket connection
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});
// check that the user is on the online
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("Connected user:", socket.id);
  const token = socket.handshake.auth.token;
  //   current user detail
  const user = await getUserDetailsFromToken(token);
  //create a room
  socket.join(user?._id);
  onlineUser.add(user?._id);

  io.emit("onlineUser", Array.from(onlineUser));
  // disconnect

  socket.on("disconnect", () => {
    onlineUser.delete(user?._id)
    console.log("Disconnected user:", socket.id);
  });
});

module.exports = { app, server };
