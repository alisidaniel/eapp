const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
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
            allowNull: false
        }
    });

    return Product;
}