const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username:{
            type: DataTypes.STRING,
            required: true,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
            required: true,
        },
        password:{
            type: DataTypes.STRING,
            required: true,
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });

    return User;
}