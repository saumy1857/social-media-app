const User = require('../../user-service/models/User');
const { hashPassword, comparePassword } = require('../../common/utils/hashUtils');
const { generateToken } = require('../../common/utils/jwtUtils');

exports.signup = async (req, res) => {
  try {
    const { name, mobileNo, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = new User({ name, mobileNo, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
