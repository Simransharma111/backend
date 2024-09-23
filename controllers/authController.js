const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BlacklistToken = require('../models/BlacklistToken'); 
require('dotenv').config();


// Register User
const registerUser = async (req, res) => {
  const { userId, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { userId }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists', type: 'error' });
    }

    // Create a new user
    user = new User({
      userId,
      email: email.toLowerCase(),
      password
    });

    // Hash the password before saving
    await user.save();

    // Automatically log in the user after registration (optional)
    const payload = {
      user: {
        id: user._id,
        userId: user.userId,
        email: user.email
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login User
const loginUser = async (req, res) => {
  const { userId, email, password } = req.body;

  try {
    const normalizedEmail = email ? email.toLowerCase().trim() : null;
    const normalizedUserId = userId ? userId.toLowerCase().trim() : null;

    let user = await User.findOne({
      $or: [{ email: normalizedEmail }, { userId: normalizedUserId }]
    });

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Debug: Log the stored password hash and the entered password
    console.log('Stored Hashed Password:', user.password);
    console.log('Entered Password:', password);

    // Compare the password entered by the user with the hashed password stored in the database
    const isMatch = await user.comparePassword(password);

    // Debug: Log whether the passwords matched
    console.log('Password Match:', isMatch);

    if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

    const payload = {
      user: {
        id: user._id,
        userId: user.userId,
        email: user.email
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).send('Server error');
  }
};

 // Assumed model for storing blacklisted tokens

// controllers/authController.js
// Model to store blacklisted tokens

const logoutUser = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from headers

    if (!token) return res.status(400).json({ msg: 'No token provided' });

    // Add the token to the blacklist (or another method to invalidate it)
    const blacklistedToken = new BlacklistToken({ token });
    await blacklistedToken.save();

    res.json({ message: 'Logged out successfully!' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Error logging out', error: error.message });
  }
};

module.exports = { registerUser, loginUser,logoutUser };
