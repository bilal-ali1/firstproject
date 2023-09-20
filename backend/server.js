const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config(".env");

app.use(cors()); // cors middleware

// Configure MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, 
    {useNewUrlParser: true,
    useUnifiedTopology: true,}) 
  


// Define routes and middleware
// Add your routes and middleware here...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});