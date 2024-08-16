const router = require("express").Router();
const blogPostController = require("../controller/blogpostController");
const { verify } = require("../middleware/JWTverification");
const {check}  = require('express-validator');

// Route to get all blog posts
router.get("/getall/users", blogPostController.getAllPosts);

// Route to get a single blog post by ID
router.get('/:id', blogPostController.getPost);

// Route to gets blog post by userID
router.get('/author/:id', blogPostController.getUserPost);

// Route to create a new blog post 
router.post('/create', check('content', 'Content is required').not().isEmpty(), 
check('title', 'title is required').not().isEmpty(), check('author', 'author is required').not().isEmpty(),verify, blogPostController.createPost);

// Route to update a blog post by ID 
router.put("/:id", verify, blogPostController.updatePost);

// Route to delete a blog post by ID 
router.delete("/:id", verify, blogPostController.deletePost);

module.exports = router;
