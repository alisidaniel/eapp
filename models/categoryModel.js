const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {

    const Category =  sequelize.define('Category', {

        name:{
            type: DataTypes.STRING,
            required: true
        },
        subcategory:{
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING
        },

    });

    return Category;    

}