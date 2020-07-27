const db = require("../models");
const Product = db.Product;
const Op = db.Sequelize.Op;


const create = (req, res, next) => {
    console.log(...req.body);
}

const edit = (req, res, next) => {

}

const deleteProduct = (req, res, next) => {

}

module.exports = {
    create
}