require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var {PORT} = require('./config/config');

var indexRoutes = require('./router/indexRoutes');
var productRoutes = require('./router/productRoutes');

const db = require("./models");

db.sequelize.sync().then(() => {
    console.log("running db here ...");
}).catch(err => {
    console.log(`DB:: sync error: ${err}`);
});

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.use(express.json());

app.use(indexRoutes);
app.use(productRoutes);

app.use(function (error, req, res, next) {
    if(error instanceof SyntaxError){ //Handle SyntaxError here.
      return res.status(500).send({data : "Invalid data"});
    } else {
      next();
    }
});

app.listen(PORT, "0.0.0.0", () => {
    
    console.log(`Project running on port ${PORT}`);
});