const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const User = require('./userModel');

module.exports = (sequelize, DataTypes) => {
    const productModel = sequelize.define('Product', {
        title:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        category:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        subcategory:{
            type: DataTypes.STRING,
            allowNull: true
        },
        description:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        price:{
            type: DataTypes.DOUBLE,
            defaultValue: 0.00,
            allowNull: false
        }
    });

    return productModel;
}