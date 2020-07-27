const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
    const shippingAddress = sequelize.define('ShippingAddress', {
        address:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        city:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        state:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        postalCode:{
            type: DataTypes.STRING,
            allowNull: false
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return shippingAddress;
}