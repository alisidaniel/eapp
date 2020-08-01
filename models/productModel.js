const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        title:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        imagePath: {
            type: DataTypes.STRING
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
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        deliveryTime:{ //in hours
            type: DataTypes.BIGINT,
            allowNull: true
        },
        status:{ //1 is active 2 is closed
            type: DataTypes.INTEGER,
            allowNull: true
        },
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Product;
}