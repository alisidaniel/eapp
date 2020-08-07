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
db.Cart = require('./cartModels')(sequelize, Sequelize);
db.Order = require('./orderModels')(sequelize, Sequelize);
db.Category = require('./categoryModel')(sequelize, Sequelize);


//# Model Relationships 
db.User.hasMany(db.Product, { as: "Product", foreignKey: "userId" });
db.Product.belongsTo(db.User, { as: "User", foreignKey: "userId" });

//Shhipping relation
db.User.hasOne(db.ShippingAddress, { as: "ShippingAddress", foreignKey: "userId"});
db.ShippingAddress.belongsTo(db.User, { as: "User", foreignKey: "userId" });

//Order relation
db.User.hasMany(db.Order, { as: "Order", foreignKey: "userId" });
db.Order.belongsTo(db.User, { as: "User", foreignKey: "userId" });

//Cart relations
// db.Cart.belongsTo(db.User, { as: "User", foreignKey: "userId"});
db.Cart.belongsTo(db.Product, { as: 'Product', foreignKey: "productId"});

module.exports = db;