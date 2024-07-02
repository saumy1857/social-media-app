const { Comment, Like, View } = require('../models/Interaction');

// Create Comment
exports.createComment = async (req, res) => {
  try {
    const { userId, discussionId, text } = req.body;
    const comment = new Comment({ userId, discussionId, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Like Comment
exports.likeComment = async (req, res) => {
  try {
    const { userId } = req.body;
    const comment = await Comment.findById(req.params.id);
    comment.likes.push(userId);
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reply to Comment
exports.replyComment = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const comment = await Comment.findById(req.params.id);
    comment.replies.push({ userId, text });
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// View Count
exports.viewDiscussion = async (req, res) => {
  try {
    const { userId, discussionId } = req.body;
    const view = await View.findOneAndUpdate(
      { userId, discussionId },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    res.status(200).json(view);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
