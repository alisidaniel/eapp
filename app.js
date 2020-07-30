require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var {PORT} = require('./config/config');

var indexRoutes = require('./router/indexRoutes');

const db = require("./models");

db.sequelize.sync().then(() => {
    console.log("running db here ...")
}).catch(err => {
    console.log(`sync error: ${err}`)
});

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.use(express.json());

app.use('/api/v1/enudiproject/', indexRoutes);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Project running on port ${PORT}`);
})