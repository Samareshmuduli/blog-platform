const router = require("express").Router();
const { verify } = require("../middleware/JWTverification");
const userRouter = require("../controller/userController");
const {check}  = require('express-validator');

// Route for user login
router.post('/login',check('email', 'Please include a valid email').isEmail(),
check('password', 'Password is required').not().isEmpty(), userRouter.login);

// Route for user registration
router.post('/register', check('username', 'Username is required').not().isEmpty(),
check('email', 'Please include a valid email').isEmail(),
check('password', 'Password is required').not().isEmpty(),userRouter.register);

module.exports = router;
