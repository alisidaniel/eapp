const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define('Cart', { 
        
        unitPrice:{
            type: DataTypes.FLOAT
        },
        totalPrice:{
            type: DataTypes.FLOAT
        },
        totalQty:{
            type: DataTypes.INTEGER,
        },
        userId:{
            type: DataTypes.STRING
        }
    });

    return Cart;

}