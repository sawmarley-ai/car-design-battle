const mongoose = require('mongoose');
const GameSchema = new mongoose.Schema({
  roomId: String,
  players: [{ userId: String, username: String, design: Object, points: Number }],
  phase: String,
  votes: [{ voter: String, targetId: String }],
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Game', GameSchema);
