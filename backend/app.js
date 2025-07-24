require('dotenv').config();
const express = require('express');
const app = express();

// Connect to DB
require("./conn/conn");

// Middleware
app.use(express.json()); 

// Test route
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Import and use user routes
const userRoutes = require("./routes/user.js");
app.use("/api/v1", userRoutes);

const bookRoutes=require("./routes/book.js");
app.use("/api/v1",bookRoutes);

const favourite=require("./routes/favourite.js");
app.use("/api/v1",favourite);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
