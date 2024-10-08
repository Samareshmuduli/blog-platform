const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the User schema
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Export the User model based on the schema
module.exports = mongoose.model("user", userSchema);
