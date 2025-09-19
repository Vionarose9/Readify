require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Connect to DB
require("./conn/conn");

// Middleware
app.use(express.json()); 
app.use(cors());

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

const cart=require("./routes/cart.js");
app.use("/api/v1",cart);

const order=require("./routes/order.js");
app.use("/api/v1",order);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
