const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  points: { type: Number, default: 0 },
  dailyClaimedAt: Date,
  wallet: String,
});
module.exports = mongoose.model('User', UserSchema);
