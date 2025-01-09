// const express = require("express");
// const cors = require('cors');

// const app = express();

// require("dotenv").config();
// require("./config/db").connect();

// app.use(cors())
// app.use(express.static(__dirname + '/public'));
// app.use(express.json());

// const apiRoutes = require("./routes/index");

// app.use("/api", apiRoutes);

// module.exports = app;


const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();
require("./config/db").connect();
require("./models/product");

// Define CORS options
const corsOptions = {
    origin: "https://departmental-store-frontend.vercel.app", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allows cookies or authentication headers
};

// Use CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

app.use(express.static(__dirname + "/public"));
app.use(express.json());

const apiRoutes = require("./routes/index");

// Use API routes
app.use("/api", apiRoutes);

module.exports = app;
