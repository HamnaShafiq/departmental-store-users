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
const cors = require('cors');

const app = express();

require("dotenv").config();
require("./config/db").connect();
require('./models/product');

// app.use(cors())

const corsoption = {
    origin: [
        '*'
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}
app.use(cors(corsoption));


app.options("*", cors(corsoption));

app.options("*", cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const apiRoutes = require("./routes/index");

app.use("/api", apiRoutes);

module.exports = app;