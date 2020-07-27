const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
    const userModel = sequelize.define('User', {
        firstName:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            required: true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        }
    });

    return userModel;
}