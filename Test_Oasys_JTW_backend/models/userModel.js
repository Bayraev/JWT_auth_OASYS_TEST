const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: Number, required: true, default: 1 }, // user or admin (2 and 1)
  lvl: { type: Number, default: 3 }, // lvl 1-2 for user, lvl 1-3 for admins
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
