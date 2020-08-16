const { Sequelize, DataTypes } = require('sequelize');
const { Product } = require('.');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define('Order', {

        reference:{
            type: DataTypes.STRING,
            allowNull: false
        },
        amount:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status:{ //1 is active 2 is cancelled
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }

    });

    return Order;
}