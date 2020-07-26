const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
    const userModels = sequelize.define('User', {
        firstName:{
            type: DataTypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
    });

    return userModels;
}