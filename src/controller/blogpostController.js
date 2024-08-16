const Post = require("../model/blogpostSchema");
const {check,validationResult} =require("express-validator")

/** Create a new post
 * author:samaresh
 * @param {*} req 
 * @param {*} res 
 */
exports.createPost = async (req, res) => {
    console.log(req.user)
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id
        });

        const newPost = await post.save();
        res.status(201).json({
            message: 'Post created successfully',
            Blogs: newPost
        });
    } catch (err) {
        res.status(400).json({ message: err.message }); 
    }
};


/** Get a single post by ID
 * author:samaresh
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' }); 

        res.status(200).json({
            message: "Post retrieved successfully",
            Blogs: post
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** Get posts by userID
 * author:samaresh
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getUserPost = async (req, res) => {
    try {
        const post = await Post.find({author:req.params.id});
        if (post==[]) return res.status(404).json({ message: 'Posts are not found' }); 

        res.status(200).json({
            message: "Posts retrieved successfully",
            payload: post
        });
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};
/** Get all posts
 * author:samaresh
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            message: "Blog posts retrieved successfully",
            Blogs: posts
        });
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};


/**Update a post by ID
 * author:samaresh
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        //new:true for avoiding call save method again
        if (!post) return res.status(404).json({ message: 'Post not found' }); 
        if(!(post.author==req.user._id))  res.status(404).json({ message: 'Only author can update this post' }); 
        
        res.status(200).json({
            message: 'Post updated successfully',
            payload: post
        });
    } catch (err) {
        res.status(400).json({ message: err.message }); 
    }
};


/**Delete a post by ID
 * author:samaresh
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' }); 
        if(!(post.author==req.user._id))  res.status(404).json({ message: 'Only author can update this post' });
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

