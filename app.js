const express = require("express");
const cors = require('cors');

const app = express();

require("dotenv").config();
require("./config/db").connect();
require('./models/product'); 

// app.use(cors())
app.use(cors({
    origin: ["http://localhost:3000", "https://departmental-store-frontend.vercel.app/"], // Replace with your frontend's URL
    
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Enable cookies and credentials sharing
}));


app.options("*", cors()); 
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const apiRoutes = require("./routes/index");

app.use("/api", apiRoutes);

module.exports = app;