const db = require("../models");
const Product = db.Product;
const User = db.User;
const Op = db.Sequelize.Op;


const create = async (req, res, next) => {
    try{

        console.log(req.body)
        let newItem =  new Product({...req.body});
         
        await newItem.save();

        return res.status(200).json({newItem});

    }catch(e){
        next(e);
    }
}

const edit = (req, res, next) => {

}

const deleteProduct = (req, res, next) => {

}

module.exports = {
    create, edit, deleteProduct
}