require("dotenv").config();
var express = require('express');
var {PORT} = require('./config/config');

var app = express();


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Project running on port ${PORT}`);
})