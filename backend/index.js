const express = require("express");
const dbConnect = require("./config/dataBase");
const cors = require('cors');
require('dotenv').config();
const work = require('./routes/getWorkout');
const app = express();
const PORT = process.env.PORT || 5001;
const getPlan = require('./routes/getPlan')
// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use('/work', work);
// Routes
const auth = require('./routes/auth');
app.use(auth); // Make sure to define the base path for auth routes
app.use('/api', getPlan);
// Logging middleware
app.use((req, res, next) => {
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Body:', req.body);
    next();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Connection established successfully at ${PORT}`);
});

// Connect to the database
dbConnect();
