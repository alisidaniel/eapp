const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
    const ShippingAddress = sequelize.define('ShippingAddress', {

        fname:{
            type: DataTypes.STRING
        },
        lname:{
            type: DataTypes.STRING
        },
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
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return ShippingAddress;
}