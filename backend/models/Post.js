const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 300 },
  body: { type: String, maxlength: 40000 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  commentCount: { type: Number, default: 0 }
}, { timestamps: true });

postSchema.index({ createdAt: -1 });
postSchema.index({ likes: 1 });

module.exports = mongoose.model('Post', postSchema);
