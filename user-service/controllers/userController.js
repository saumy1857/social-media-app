const User = require('../models/User');

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, mobileNo, email, password } = req.body;
    const user = new User({ name, mobileNo, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List Users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Search User by Name
exports.searchUserByName = async (req, res) => {
  try {
    const users = await User.find({ name: new RegExp(req.query.name, 'i') });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
