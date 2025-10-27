// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> res.send({ok:true, msg:'Car Design Battle backend'}));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', socket => {
  console.log('socket connected', socket.id);

  socket.on('joinRoom', ({ roomId, username }) => {
    socket.join(roomId);
    socket.data.username = username;
    io.to(roomId).emit('systemMessage', { msg: `${username} انضم إلى الغرفة.` });
  });

  socket.on('designer:update', ({ roomId, design }) => {
    socket.to(roomId).emit('designer:update', { design, by: socket.data.username });
  });

  socket.on('chat:message', ({ roomId, message }) => {
    io.to(roomId).emit('chat:message', { from: socket.data.username, message });
  });

  socket.on('vote:submit', ({ roomId, targetId }) => {
    io.to(roomId).emit('vote:submitted', { voter: socket.data.username, targetId });
  });

  socket.on('webrtc:signal', ({ roomId, to, data }) => {
    io.to(to).emit('webrtc:signal', { from: socket.id, data });
  });

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// حاول الاتصال بـ MongoDB بدون تعطيل السيرفر
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/car-design', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('⚠️ MongoDB connection failed:', err.message);
});

