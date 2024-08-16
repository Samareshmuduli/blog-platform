const router = require("express").Router();
const { verify } = require("../middleware/JWTverification");
const userRouter = require("../controller/userController");
const {check}  = require('express-validator');

// Route for user login
router.post('/login',check('email', 'Please include a valid email').isEmail(),
check('password', 'Password is required').isLength({ min: 7, max: 15 }), userRouter.login);

// Route for user registration
router.post('/register', check('username', 'Username is required').isLength({ min: 10, max: 20 }),
check('email', 'Please include a valid email').isEmail(),
check('password', 'Password is required').isLength({ min: 7, max: 15 }),userRouter.register);

module.exports = router;
