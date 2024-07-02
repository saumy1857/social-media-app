const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  discussionId: { type: Schema.Types.ObjectId, ref: 'Discussion', required: true },
  text: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  replies: [{ 
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }]
}, { timestamps: true });

const LikeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  discussionId: { type: Schema.Types.ObjectId, ref: 'Discussion' }
}, { timestamps: true });

const ViewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  discussionId: { type: Schema.Types.ObjectId, ref: 'Discussion' },
  count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = {
  Comment: mongoose.model('Comment', CommentSchema),
  Like: mongoose.model('Like', LikeSchema),
  View: mongoose.model('View', ViewSchema)
};
