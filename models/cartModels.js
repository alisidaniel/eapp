const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define('Cart', { 
        
        quantity:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        total:{
            type: DataTypes.DOUBLE,
            defaultData: 0.00,
            required: true
        }

    });

    return Cart;

}