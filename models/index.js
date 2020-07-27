const Sequelize = require("sequelize");
const {DB_HOST, DB_USER, DB_NAME, DB_PASS, pool, dialect } = require('../config/config');


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: dialect,
  operatorsAliases: false,

  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize
.authenticate()
.then(() => { 
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});;

db.User = require('./userModel.js')(sequelize, Sequelize);
db.Product = require('./productModel.js')(sequelize, Sequelize);
db.ShippingAddress = require('./shippingAddressModel.js')(sequelize, Sequelize);

module.exports = db;