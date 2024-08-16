const {check}  = require('express-validator');
const validation = (req, res, next) => {
    try {
        check('content', 'Content is required').not().isEmpty(), 
        check('title', 'title is required').not().isEmpty(), 
        check('author', 'author is required').not().isEmpty()

        next();
    } catch (error) {
       
        res.status(400).json({ message: error.message });
    }
};

module.exports = { validation };