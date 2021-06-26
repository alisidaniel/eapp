var express = require("express");
var { sendMessage } = require("../controllers/contactController");
var { login, register } = require("../controllers/authController");
var { updateRecord } = require("../controllers/userController");
var {
  sessionChecker,
  checkoutSession,
  isAdmin,
} = require("../middleware/auth");

const db = require("../models");
const User = db.User;
const Category = db.Category;
const Product = db.Product;
const ShippingAddress = db.ShippingAddress;
const Cart = db.Cart;
const Order = db.Order;
const Op = db.Sequelize.Op;

var router = express.Router();

/* GET authentication page. */
router.post("/register", register);
router.post("/login", login);

router.get("/register", function (req, res, next) {
  res.render("register", { message: "" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { message: "" });
});

router.get("/admin", isAdmin, async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let categoryData = await Category.findAll();

  let productData = await Product.findAll();

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  const user = await User.findOne({ where: { id: userId } });

  res.render("admin", {
    cartItem: cartItem,
    categories: categoryData,
    products: productData,
    data: req.session.user,
    user: user,
  });
});

///
router.get("/customers", isAdmin, async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  const users = await User.findAll();

  let categoryData = await Category.findAll();

  res.render("customers", {
    cartItem: cartItem,
    categories: categoryData,
    data: req.session.user,
    user: users,
  });
});

/* GET home page. */
router.get("/", async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let categoryData = await Category.findAll();

  let productData = await Product.findAll();

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  res.render("", {
    cartItem: cartItem,
    categories: categoryData,
    products: productData,
    data: req.session.user,
  });
});

router.get("/index", async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let categoryData = await Category.findAll();

  let productData = await Product.findAll();

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  res.render("index", {
    cartItem: cartItem,
    categories: categoryData,
    products: productData,
    data: req.session.user,
  });
});

router.get("/account", sessionChecker, async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let categoryData = await Category.findAll();

  let productData = await Product.findAll();

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  res.render("account", {
    categories: categoryData,
    cartItem: cartItem,
    products: productData,
    data: req.session.user,
  });
});

/* profile page. */
router.get("/profile", sessionChecker, function (req, res, next) {
  res.render("profile", { data: req.session.user });
});

router.post("/profile", updateRecord);

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/product-details", async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let data = await Product.findByPk(req.query.id);

  let relatedItem = await Product.findAll({
    where: {
      subcategory: {
        [Op.like]: `%${data.dataValues.subcategory}`,
      },
    },
  });

  let isExist = await Cart.count({
    where: {
      [Op.and]: [{ productId: data.dataValues.id }, { userId: userId }],
    },
  });

  let categoryData = await Category.findAll();

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  res.render("product-details", {
    product: data,
    relatedItem: relatedItem,
    cartItem: cartItem,
    cartExist: isExist,
    categories: categoryData,
    data: req.session.user,
  });
});

router.get("/product-list", async function (req, res, next) {
  let { subcategory, category } = req.query;

  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  console.log(category);

  let categoryData = await Category.findOne({
    where: {
      name: {
        [Op.like]: `%${category}%`,
      },
    },
  });

  let searchquery = await Product.findAll({
    where: {
      [Op.or]: [
        {
          category: {
            [Op.like]: `${
              subcategory === undefined ? `%${category}%` : `%${subcategory}`
            }%`,
          },
        },
        {
          subcategory: {
            [Op.like]: `${
              subcategory === undefined ? `%${category}%` : `%${subcategory}`
            }%`,
          },
        },
      ],
    },
  });

  let latest = await Product.findAll({
    order: [["id", "DESC"]],

    limit: 10,
  });

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  res.render("product-list", {
    cartItem: cartItem,
    categories: categoryData,
    product: searchquery,
    newProducts: latest,
    data: req.session.user,
  });
});

router.get("/product-search", async function (req, res, next) {
  let { search } = req.query;

  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let searchquery = await Product.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { category: { [Op.like]: `%${search}%` } },
        { subcategory: { [Op.like]: `%${search}%` } },
        { brand: { [Op.like]: `%${search}%` } },
      ],
    },
    order: [["id", "DESC"]],

    limit: 10,
  });

  let categoryData = await Category.findAll();

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  res.render("product-search", {
    product: searchquery,
    categories: categoryData,
    cartItem: cartItem,
    data: req.session.user,
  });
});

router.post("/index/addToCart/", async function (req, res, next) {
  let { productId, qty, price } = req.body;
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;
  let quantity = qty === undefined ? 1 : qty;

  let itemExist = await Cart.findOne({
    where: {
      [Op.and]: [{ userId: userId }, { productId: productId }],
    },
  });

  let newCartItem = new Cart({
    userId: userId,
    productId: productId,
    totalQty: quantity,
    unitPrice: price,
    totalPrice: price * quantity,
  });

  if (itemExist === undefined || itemExist == null) {
    await newCartItem.save();
  }

  if (itemExist) {
    let updateCart = await Cart.update(
      { totalQty: quantity, totalPrice: price * quantity },
      {
        where: {
          id: itemExist.id,
        },
      }
    );
  }

  res.redirect("/index");
});

router.post("/description/addToCart/", async function (req, res, next) {
  let { productId, qty, price } = req.body;
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;
  let quantity = qty === undefined ? 1 : qty;

  let itemExist = await Cart.findOne({
    where: {
      [Op.and]: [{ userId: userId }, { productId: productId }],
    },
  });

  let newCartItem = new Cart({
    userId: userId,
    productId: productId,
    totalQty: quantity,
    unitPrice: price,
    totalPrice: price * quantity,
  });

  if (itemExist === undefined || itemExist == null) {
    await newCartItem.save();
  }

  if (itemExist) {
    let updateCart = await Cart.update(
      { totalQty: quantity, totalPrice: price * quantity },
      {
        where: {
          id: itemExist.id,
        },
      }
    );
  }

  res.redirect(`/product-details?id=${productId}`);
});

router.get("/shoping-cart", async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  let products = await Product.findAll();

  var totalamount = [];

  cartItem.forEach((amount) => {
    totalamount.push(amount.dataValues.totalPrice);
  });

  var sumamount = totalamount.reduce(function (a, b) {
    return a + b;
  }, 0);

  res.render("shoping-cart", {
    cartItem: cartItem,
    products: products,
    sumamount: sumamount,
    data: req.session.user,
  });
});

router.post("/cartUpdate", async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let { qty, productId, price } = req.body;

  let updateCart = await Cart.update(
    { totalPrice: qty * price, totalQty: qty },
    {
      where: {
        userId: userId,
        productId: productId,
      },
    }
  );

  res.redirect("/shoping-cart");
});

router.post("/removeCartItem", async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let { productId } = req.body;

  await Cart.update(
    { userId: null },
    {
      where: {
        userId: userId,
        productId: productId,
      },
    }
  );

  res.redirect("/shoping-cart");
});

router.get("/checkout", checkoutSession, async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  let products = await Product.findAll();

  var totalamount = [];

  cartItem.forEach((amount) => {
    totalamount.push(amount.dataValues.totalPrice);
  });

  var sumamount = totalamount.reduce(function (a, b) {
    return a + b;
  }, 0);

  let categoryData = await Category.findAll();

  let addressExist = await ShippingAddress.findOne({
    where: {
      userId: userId,
    },
  });

  res.render("checkout", {
    cartItem: cartItem,
    categories: categoryData,
    sumamount: sumamount,
    address: addressExist,
    data: req.session.user,
    products: products,
  });
});

router.post("/post/order", async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  var cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  if (req.body.response.status === "success") {
    cartItem.forEach((cart) => {
      Order.create({
        reference: req.body.response.reference,
        amount: cart.dataValues.unitPrice,
        status: 0,
        userId: cart.dataValues.userId,
        productId: cart.dataValues.productId,
      });

      Cart.update(
        { userId: null },
        {
          where: {
            userId: cart.dataValues.userId,
          },
        }
      );
    });
  }

  res.redirect(301, "/payment/successful");
});

router.get("/orders", sessionChecker, async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  let categoryData = await Category.findAll();

  let orders = await Order.findAll({
    where: {
      userId: userId,
      status: 0,
    },
  });

  let products = await Product.findAll();

  res.render("order", {
    data: req.session.user,
    cartItem: cartItem,
    categories: categoryData,
    orders: orders,
    products: products,
  });
});

router.get("/payment/successful", async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  let categoryData = await Category.findAll();

  res.render("payment", {
    data: req.session.user,
    cartItem: cartItem,
    categories: categoryData,
  });
});

router.get("/contact", async function (req, res, next) {
  let userId =
    req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

  let cartItem = await Cart.findAll({
    where: {
      userId: userId,
    },
  });

  let categoryData = await Category.findAll();

  res.render("contact", {
    data: req.session.user,
    cartItem: cartItem,
    categories: categoryData,
  });
});

router.post("/email/contact", sendMessage, function (req, res) {
  res.render("contact-success", { data: req.body });
});

router.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/login");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
