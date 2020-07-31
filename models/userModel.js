const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
            isEmail: true,
            required: true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false
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