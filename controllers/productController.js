const db = require("../models");
const Product = db.Product;
const User = db.User;
const Category = db.Category;
const Op = db.Sequelize.Op;

const uploadFiles = require("../middleware/imageMiddleware");

const create = async (req, res, next) => {
  try {
    await uploadFiles(req, res);

    var imageFileName = [];

    req.files.forEach((file) => {
      imageFileName.push(file.filename);
    });

    //JSON.stringify to encode to string and send to sever, use JSON.parse to convert to array from server
    let data = JSON.stringify(imageFileName);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }
    if (Array.isArray(req.body.subcategory)) {
      return res.send("Don't select more than one subcategory.");
    }

    let newItem = new Product({
      title: req.body.title,
      category: req.body.category,
      subcategory: req.body.subcategory,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      Size: req.body.size,
      color: req.body.color,
      stock: req.body.stock,
      deliveryTime: req.body.deliveryTime,
      images: data,
    });

    await newItem.save();

    return res.redirect("/show-product");
  } catch (e) {
    if (e.code === "LIMIT_UNEXPECTED_FILE") {
      return res.json("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${e}`);
  }
};

const show = async (req, res, next) => {
  try {
    let data = await Product.findAll({ where: { userId: req.body.params } });

    return res.status(200).json({ data });
  } catch (e) {
    next(e);
  }
};

const udpate = async (req, res, next) => {
  try {
    let data = await Product.udpate(
      { ...req.body },
      {
        where: {
          userId: req.body.params,
        },
      }
    );

    return res.status(200).json({
      message: "Updated suceessful.",
    });
  } catch (e) {
    next(e);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    let data = await Product.udpate(
      { deleted: true },
      {
        where: {
          userId: req.body.params,
        },
      }
    );

    return res.status(200).json({
      message: "Deleted item. ",
      status: true,
    });
  } catch (e) {
    next(e);
  }
};

const postCategory = async (req, res, next) => {
  try {
    if (req.body.subcategory instanceof Array) {
      var newcategory = req.body.subcategory.toString();
    }

    let data = await Category.create({
      name: req.body.category,
      subcategory: newcategory ? newcategory : req.body.subcategory,
    });
    return res.redirect("/show-category");
    // return res.redirect(
    //   { success: "Successfuly uploaded category." },
    //   "/category"
    // );
  } catch (e) {
    throw new Error("Something bad occured." + e);
  }
};

module.exports = {
  create,
  udpate,
  show,
  deleteRecord,
  postCategory,
};
