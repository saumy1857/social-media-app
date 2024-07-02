const Follow = require('../models/Follow');
const User = require('../models/User');
const { verifyToken } = require('../../common/utils/jwtUtils');

exports.followUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    const follow = new Follow({ followerId, followingId });
    await follow.save();
    await User.findByIdAndUpdate(followerId, { $push: { following: followingId } });
    await User.findByIdAndUpdate(followingId, { $push: { followers: followerId } });
    res.status(201).json(follow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    await Follow.findOneAndDelete({ followerId, followingId });
    await User.findByIdAndUpdate(followerId, { $pull: { following: followingId } });
    await User.findByIdAndUpdate(followingId, { $pull: { followers: followerId } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
