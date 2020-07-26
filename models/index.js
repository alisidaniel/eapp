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
db.sequelize = sequelize;

db.User = require('./userModels.js')(sequelize, Sequelize);

module.exports = db;