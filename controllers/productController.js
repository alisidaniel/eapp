const db = require("../models");
const Product = db.Product;
const User = db.User;
const Op = db.Sequelize.Op;


const create = async (req, res, next) => {
    try{

        let newItem =  new Product({...req.body});
         
        await newItem.save();

        return res.status(200).json({newItem});

    }catch(e){
        next(e);
    }
}

const show = async (req, res, next) => {

    try{
        let data = await Product.findAll({where:{userId: req.body.params}});

        return res.status(200).json({data});

    }catch(e){
        next(e);
    }
}

const udpate = async (req, res, next) => {

    try{
        let data = await Product.udpate({...req.body}, {
            where: {
                userId: req.body.params
            }
        });

        return res.status(200).json({data});

    }catch(e){

        next(e);
    }

}

const deleteRecord = async (req, res, next) => {

    try{
        let data = await Product.udpate({deleted: true}, {
            where:{
                userId: req.body.params
            }
        })

    }catch(e){
        next(e);
    }

}

module.exports = {
    create, udpate, show, deleteRecord
}