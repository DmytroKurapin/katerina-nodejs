const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
  user: { type: String, required: true, index: { unique: true } },
  pass: { type: String, required: true },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  lastIp: { type: String, required: true }
});

module.exports = mongoose.model('Users', usersSchema);
