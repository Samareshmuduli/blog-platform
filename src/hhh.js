const bcrypt = require('bcryptjs');
const User = require('../model/userSchema');
const jwt = require("jsonwebtoken");

// User registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' }); // Conflict
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const newUser = await user.save();
    res.status(201).json(newUser); // Created
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(400).json({ message: err.message }); // Bad Request for validation errors
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Not Found
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid password' }); // Unauthorized
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, "Xty139@qt", { expiresIn: '1d' });
    res.status(200).json({ message: 'Logged in successfully', access_token: token }); // OK
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: err.message }); // Internal Server Error for unexpected issues
  }
};
const token=jwt.sign(user.toObject(),"Xty139@qt",{expiresIn:'1d'})