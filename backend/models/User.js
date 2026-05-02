const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/@gannon\.edu$/, 'Only @gannon.edu emails are accepted.']
  },
  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationExpires: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
