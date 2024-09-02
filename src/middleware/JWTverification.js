const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verify = (req, res, next) => {
    try {
        // Verify the JWT token from the Authorization header
        const payload = jwt.verify(req.headers.authorization, "Xty139@qt");

        // Attach the payload to the request object
        req.user = {_id: payload.id};
        // console.log("middleware user ID",req.user)
        next();
    } catch (error) {
       
        res.status(400).json({ message: error.message });
    }
};

module.exports = { verify };
