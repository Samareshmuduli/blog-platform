const bcrypt = require('bcryptjs');
const User = require('../model/userSchema');
const jwt = require("jsonwebtoken");
const {check,validationResult} =require("express-validator")
/** User registration
 * author:samaresh
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.register = async (req, res) => {
  // console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;
  if(password=="")return res.status(400).json({ message: 'please enter password' }); 
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' }); 
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: 'uaername already registered' }); 
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User ({
      username,
      email,
      password: hashedPassword,
    });
    // console.log(user);
    const newUser = await user.save();
    res.status(201).json(newUser); // Created
  } catch (err) {
    res.status(400).json({ message: err.message }); 
  }
};


/** User login
 * author:samaresh
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); 
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid password' }); 
    }
    // console.log(user)
    // Create a JWT token
    const token = jwt.sign({ id: user._id }, "Xty139@qt", { expiresIn: '1d' });
    // console.log()
    res.status(200).json({ message: 'Logged in successfully', access_token: token ,id: user._id,username:user.username}); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};
// const token=jwt.sign(user.toObject(),"Xty139@qt",{expiresIn:'1d'})