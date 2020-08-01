const db = require("../models");
const Product = db.Product;
const User = db.User;
const Category = db.Category;
const Op = db.Sequelize.Op;

const uploadFiles = require("../middleware/imageMiddleware");

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

        return res.status(200).json({
            message: "Updated suceessful."
        });

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
        });

        return res.status(200).json({
            message: "Deleted item. ",
            status: true
        })

    }catch(e){
        next(e);
    }

}


const postCategory = async (req, res, next) => {

    try{
   
        if ( req.body.subcategory instanceof Array ){
           var newcategory = req.body.subcategory.toString();
        }
        
        let data = await Category.create({
            name: req.body.category,
            subcategory: newcategory ? newcategory : req.body.subcategory 
        });

        return res.status(200).json(data);
    
    }catch(e){
        throw new Error("Something bad occured."+e)
    }
}


const productUpload = async (req, res, next) => {

    try {
        await uploadFiles(req, res);
        console.log(req.files);
    
        if (req.files.length <= 0) {
          return res.send(`You must select at least 1 file.`);
        }
    
        return res.send(`Files has been uploaded.`);
      } catch (error) {
        console.log(error);
    
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
          return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
      }

}

module.exports = {
    
    create, udpate, show, deleteRecord, postCategory, productUpload
}