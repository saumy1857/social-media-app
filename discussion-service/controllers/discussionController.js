const Discussion = require('../models/Discussion');

// Create Discussion
exports.createDiscussion = async (req, res) => {
  try {
    const { userId, text, image, hashtags } = req.body;
    const discussion = new Discussion({ userId, text, image, hashtags });
    await discussion.save();
    res.status(201).json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Discussion
exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Discussion
exports.deleteDiscussion = async (req, res) => {
  try {
    await Discussion.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List Discussions by Hashtag
exports.listDiscussionsByHashtag = async (req, res) => {
  try {
    const discussions = await Discussion.find({ hashtags: req.query.hashtag });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List Discussions by Text
exports.listDiscussionsByText = async (req, res) => {
  try {
    const discussions = await Discussion.find({ text: new RegExp(req.query.text, 'i') });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
