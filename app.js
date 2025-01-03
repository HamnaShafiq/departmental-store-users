const express = require("express");
const cors = require('cors');

const app = express();

require("dotenv").config();
require("./config/db").connect();
require('./models/product'); 

app.use(cors())
app.options("*", cors()); 
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const apiRoutes = require("./routes/index");

app.use("/api", apiRoutes);

module.exports = app;