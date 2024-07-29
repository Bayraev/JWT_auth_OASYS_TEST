const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  lvl: { type: Number, default: 3 },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
