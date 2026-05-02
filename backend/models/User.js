const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/@gannon\.edu$/, 'Only @gannon.edu emails are accepted.']
  },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
