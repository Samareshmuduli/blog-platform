const express = require("express");
const connectDB = require("./config/database");
const userRouter = require("./router/userRouter");
const blogpostRouter = require("./router/blogpostRouter");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// User routes
app.use('/users', userRouter);

// Blog post routes
app.use("/posts", blogpostRouter);

const port = 4000;

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
