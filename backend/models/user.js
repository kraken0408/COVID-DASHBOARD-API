const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Stored as plain text
  role: { type: String, enum: ['hospital', 'healthcare'], required: true }
});

module.exports = mongoose.model('User', userSchema);
