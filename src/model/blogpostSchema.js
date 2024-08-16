const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogPostSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // References the User model
        required: true 
    }
}, {
    timestamps: true 
    // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Post', blogPostSchema);
