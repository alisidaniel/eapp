const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const {TOKEN_KEY}  = require('../config/config');

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
        phone:{
            type: DataTypes.STRING,
            required: true
        },
        address:{
            type: DataTypes.STRING,
            required: true
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

    User.prototype.generateAuthToken = function (){
        const token = jwt.sign({id: this.id, isAdmin: this.isAdmin}, TOKEN_KEY, {
            expiresIn: '1h'
        });
        return  token;
    }

    return User;
}