
const db = require("../models");
const { ShippingAddress } = require("../models");
const Shipping = db.ShippingAddress;
const Op = db.Sequelize.Op;

const store = async (req, res, next) => {

    try{
        let data = await Shipping.create({...req.body}).save();

        return res.status(200).json({data});

    }catch(e){
        next(e);
    }

}

const show = async (req, res, next) => {

    try{
        let data = await Shipping.findOne({where: {userId: req.body.params}});
        
        return res.status(200).json({data});

    }catch(e){
        next(e);
    }
    
}

const update = async (req, res, next) => {

    try{
        let data = await Shipping.update({...req.body}, {
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

        let data = await Shipping.update({deleted: true}, {
            where: {
                userId: req.body.params
            }
        });

        return res.status(200).json({message: "Deleted successful.", status: true});

    }catch(e){
        next(e);
    }
}


module.exports = { store, show, update, deleteRecord }