const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  body: { type: String, required: true, maxlength: 5000 },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null }
}, { timestamps: true });

messageSchema.index({ sender: 1, recipient: 1, createdAt: -1 });
messageSchema.index({ group: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
