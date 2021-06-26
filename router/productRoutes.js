const express = require("express");
const { isAdmin } = require("../middleware/auth");
const { create, postCategory } = require("../controllers/productController");

const db = require("../models");
const Order = db.Order;
const Product = db.Product;
const Category = db.Category;

const router = express.Router();

router.get("/product", isAdmin, async function (req, res, next) {
  try {
    let userId =
      req.session.user === undefined
        ? req.cookies.user_sid
        : req.session.user.id;
    let productData = await Product.findAll();
    let categoryData = await Category.findAll();
    res.render("product", {
      products: productData,
      categories: categoryData,
      data: req.session.user,
      error: "",
      success: "",
    });
  } catch (e) {
    res.json(e.message);
    // res.render("product", { error: e, success: "" });
  }
});

router.post("/product", isAdmin, create, async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let productData = await Product.findAll();
  let categoryData = await Category.findAll();
  res.render("show-product", {
    products: productData,
    categories: categoryData,
    data: req.session.user,
    error: "",
    success: "",
  });
});

router.get("/show-product", isAdmin, async function (req, res, next) {
  try {
    let userId =
      req.session.user === undefined
        ? req.cookies.user_sid
        : req.session.user.id;

    let productData = await Product.findAll();
    let categoryData = await Category.findAll();
    res.render("show-product", {
      products: productData,
      categories: categoryData,
      data: req.session.user,
      error: "",
      success: "",
    });
  } catch (e) {
    console.log(e.message);
    res.render("show-product", { error: e });
  }
});

router.post("/delete/product", isAdmin, async function (req, res, next) {
  let { productId } = req.body;
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  await Product.destroy({ where: { id: productId } });

  let categoryData = await Category.findAll();
  let productData = await Product.findAll();
  res.render("show-product", {
    categories: categoryData,
    products: productData,
    data: req.session.user,
    error: "",
    success: "",
    message: "Product successfully deleted.",
  });
});

router.get("/show-category", isAdmin, async function (req, res, next) {
  try {
    let userId =
      req.session.user === undefined
        ? req.cookies.user_sid
        : req.session.user.id;

    let categoryData = await Category.findAll();

    res.render("show-category", {
      categories: categoryData,
      data: req.session.user,
      error: "",
      success: "",
    });
  } catch (e) {
    res.render("show-category", { error: e });
  }
});

router.get("/category", isAdmin, async function (req, res, next) {
  try {
    let userId =
      req.session.user === undefined
        ? req.cookies.user_sid
        : req.session.user.id;

    let categoryData = await Category.findAll();

    res.render("category", {
      categories: categoryData,
      data: req.session.user,
      error: "",
      success: "",
    });
  } catch (e) {
    res.render("category", { error: e });
  }
});

router.post(
  "/category",
  isAdmin,
  postCategory,
  async function (req, res, next) {
    let userId =
      req.session.user === undefined
        ? req.cookies.user_sid
        : req.session.user.id;

    let categoryData = await Category.findAll();

    res.render("show-category", {
      categories: categoryData,
      data: req.session.user,
      error: "",
      success: "",
    });
  }
);

router.post("/delete/category", isAdmin, async function (req, res, next) {
  let { categoryId } = req.body;
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  await Category.destroy({ where: { id: categoryId } });

  let categoryData = await Category.findAll();
  res.render("show-category", {
    categories: categoryData,
    data: req.session.user,
    error: "",
    success: "",
    message: "Category successfully deleted.",
  });
});

/// Order

router.get("/show-orders", isAdmin, async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let categoryData = await Category.findAll();

  let order = await Order.findAll();
  console.log(order);
  res.render("show-orders", {
    categories: categoryData,
    data: req.session.user,
    orders: order,
    error: "",
    success: "",
  });
});

module.exports = router;
