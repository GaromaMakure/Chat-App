const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");
const {
  ConversationModel,
  MessageModel,
} = require("../models/ConversationModel");
const getConversation = require("../helpers/getConversation");

const app = express();

// Socket server setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// Track online users
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("Connected user:", socket.id);

  const token = socket.handshake.auth.token;
  const user = await getUserDetailsFromToken(token);

  if (!user || !user._id) {
    console.error("Authentication failed or user not found");
    socket.disconnect(true); // Force disconnect unauthorized user
    return;
  }

  const userIdStr = user._id.toString();

  // Join user-specific room
  socket.join(userIdStr);
  onlineUser.add(userIdStr);

  // Notify all clients about online users
  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", async (otherUserId) => {
    console.log("Requesting messages with user:", otherUserId);

    const userDetails = await UserModel.findById(otherUserId).select(
      "-password"
    );
    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      profile_pic: userDetails?.profile_pic,
      online: onlineUser.has(otherUserId),
    };
    socket.emit("message-user", payload);

    const getConversationMessage = await ConversationModel.findOne({
      $or: [
        { sender: user._id, receiver: otherUserId },
        { sender: otherUserId, receiver: user._id },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

    socket.emit("message", getConversationMessage?.messages || []);
  });

  socket.on("new message", async (data) => {
    let conversation = await ConversationModel.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    });

    if (!conversation) {
      conversation = await new ConversationModel({
        sender: data?.sender,
        receiver: data?.receiver,
      }).save();
    }

    const message = new MessageModel({
      text: data.text,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      msgByUserId: data?.msgByUserId,
    });

    const saveMessage = await message.save();

    await ConversationModel.updateOne(
      { _id: conversation._id },
      {
        $push: { messages: saveMessage._id },
      }
    );

    const updatedConversation = await ConversationModel.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

    io.to(data?.sender).emit("message", updatedConversation?.messages || []);
    io.to(data?.receiver).emit("message", updatedConversation?.messages || []);

    const conversationSender = await getConversation(data?.sender);
    const conversationReceiver = await getConversation(data?.receiver);

    io.to(data?.sender).emit("conversation", conversationSender);
    io.to(data?.receiver).emit("conversation", conversationReceiver);
  });

  socket.on("sidebar", async (currentUserId) => {
    console.log("Sidebar request for user:", currentUserId);
    const conversation = await getConversation(currentUserId);
    socket.emit("conversation", conversation);
  });

  socket.on("seen", async (msgByUserId) => {
    const conversation = await ConversationModel.findOne({
      $or: [
        { sender: user._id, receiver: msgByUserId },
        { sender: msgByUserId, receiver: user._id },
      ],
    });

    const conversationMessageIds = conversation?.messages || [];

    await MessageModel.updateMany(
      { _id: { $in: conversationMessageIds }, msgByUserId },
      { $set: { seen: true } }
    );

    const conversationSender = await getConversation(userIdStr);
    const conversationReceiver = await getConversation(msgByUserId);

    io.to(userIdStr).emit("conversation", conversationSender);
    io.to(msgByUserId).emit("conversation", conversationReceiver);
  });

  socket.on("disconnect", () => {
    onlineUser.delete(userIdStr);
    console.log("Disconnected user:", socket.id);
    io.emit("onlineUser", Array.from(onlineUser)); // Update all clients
  });
});

module.exports = {
  app,
  server,
};
