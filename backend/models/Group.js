const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  limit: { type: Number, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
