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
            get: function (){
                return  JSON.parse(this.getDataValue("slug"));
            },
            set: function(value) {
                return this.setDataValue("slug", JSON.stringify(value));
            }
        }

    });

    return Category;    

}