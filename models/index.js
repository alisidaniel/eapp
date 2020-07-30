const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
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


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = require('./userModel.js')(sequelize, Sequelize);
db.Product = require('./productModel.js')(sequelize, Sequelize);
db.ShippingAddress = require('./shippingAddressModel.js')(sequelize, Sequelize);


//# Model Relationships 
db.User.hasMany(db.Product, { as: "Product", foreignKey: "userId" });
db.Product.belongsTo(db.User, { as: "User", foreignKey: "userId" });
db.ShippingAddress.belongsTo(db.User, { as: "User", foreignKey: "userId" });

module.exports = db;