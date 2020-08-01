const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {

    const CartItem = sequelize.define('CartItem', { 
        
        totalPrice:{
            type: DataTypes.FLOAT,
        },

        totalQty:{
            type: DataTypes.FLOAT,
        }

    });

    return CartItem;

}