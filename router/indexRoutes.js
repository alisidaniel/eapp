var express = require('express');
var {sendMessage} = require('../controllers/contactController');
var {login, register} = require('../controllers/authController');
var {account, updateRecord} = require('../controllers/userController');
var {sessionChecker} = require('../middleware/auth');


const db = require('../models');
const { func } = require('joi');
const Category = db.Category;
const Product  = db.Product;
const Cart = db.Cart;
const Op = db.Sequelize.Op;

var router = express.Router();

/* GET authentication page. */
router.post('/register', register);
router.post('/login', login);


router.get('/register', function(req, res, next){
    res.render('register');
});

router.get('/login', function(req, res, next){
    res.render('login');
});



/* GET home page. */
router.get('/', async function(req, res, next) {

    let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

    let categoryData = await Category.findAll();

    let productData = await Product.findAll();

    let cartItem = await Cart.findAll({where:{
        userId : userId
    }});
    
    res.render('index', {cartItem: cartItem, categories: categoryData, products: productData});
});

router.get('/index', async function(req, res, next){

    let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

    let categoryData = await Category.findAll();

    let productData = await Product.findAll();

    let cartItem = await Cart.findAll({where:{
        userId : userId
    }});
 
    res.render('index', {cartItem: cartItem, categories: categoryData, products: productData});
});

router.get('/account', sessionChecker, async function(req, res, next){

    let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

    let categoryData = await Category.findAll();

    let productData = await Product.findAll();

    let cartItem = await Cart.findAll({where:{
        userId : userId
    }});

    res.render('account', {categories: categoryData, cartItem: cartItem, products: productData, data: req.session.user});
});

/* profile page. */
router.get('/profile', sessionChecker, function(req, res, next){
    res.render('profile', {data: req.session.user});
});

router.post('/profile', updateRecord);

router.get('/about', function(req, res, next){
    res.render('about');
});

router.get('/product-details', async function(req, res, next){

    let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

    let data = await Product.findByPk(req.query.id);

    let relatedItem = await Product.findAll({
        where:{
            subcategory:{
                [Op.like]: `%${data.dataValues.subcategory}`
            }
        }
    });

    let isExist = await Cart.count({
        where:{
            [Op.and]: [
                {productId: data.dataValues.id},
                {userId: userId}
            ]
        }
    });

    let categoryData = await Category.findAll();

    let cartItem = await Cart.findAll({where:{
        userId : userId
    }});

    res.render('product-details', {
        product: data, relatedItem: relatedItem, cartItem: cartItem,
        cartExist: isExist, categories: categoryData
    });
});

router.get('/product-list', async function(req, res, next){

    let { subcategory, category } = req.query;

    let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

    let categoryData = await Category.findOne({
        where:{
            name:{
                [Op.like]: `%${category}`
            }
        }
    });

    let searchquery = await Product.findAll({
        where:{
            [Op.or]: [
                { category: { [Op.like]: `${subcategory === undefined ? `%${category}%` :  `%${subcategory}`}%` } },
                { subcategory: { [Op.like]: `${subcategory === undefined ? `%${category}%` :  `%${subcategory}`}%` } }
            ]
        }
    });

    let latest = await Product.findAll({
  
        order: [
            ['id', 'DESC']
        ],

        limit: 10
    });

    let cartItem = await Cart.findAll({where:{
        userId : userId
    }});

    res.render('product-list', {cartItem: cartItem, categories: categoryData, product: searchquery, newProducts: latest});
});

router.get('/product-search', async function(req, res, next){

        let {search} = req.query;

        let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

        let searchquery = await Product.findAll({
            where:{
                [Op.or]: [
                    { title: { [Op.like]: `%${search}%` } },
                    { category: { [Op.like]: `%${search}%` } },
                    { subcategory: { [Op.like]: `%${search}%` } },
                    { brand: { [Op.like]: `%${search}%` } },  
                ]
            },
            order: [
                ['id', 'DESC']
            ],
    
            limit: 10
        });

        let categoryData = await Category.findAll();

        let cartItem = await Cart.findAll({where:{
            userId : userId
        }});

    res.render('product-search', {product: searchquery, categories: categoryData, cartItem: cartItem});
});

router.post('/index/addToCart/', async function (req, res, next){
    let { productId, qty, price} = req.body;
    let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;
    let quantity = qty === undefined ? 1 : qty;

    let itemExist = await Cart.findOne({
        where:{
            [Op.and]:[
                { userId: userId },
                { productId: productId }
            ]
        }
    });
    
    let newCartItem = new Cart({
        userId: userId,
        productId: productId,
        totalQty: quantity,
        unitPrice: price,
        totalPrice: price * quantity
    });

    if (itemExist === undefined || itemExist == null){

        await newCartItem.save();
    }

    if (itemExist){
        
        let updateCart = await Cart.update({ totalQty: quantity, totalPrice: price * quantity},
          {
            where:{
                id: itemExist.id
            }
        });
    }

    res.redirect('/index');
});

router.post('/description/addToCart/', async function (req, res, next){
    let { productId, qty, price} = req.body;
    let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;
    let quantity = qty === undefined ? 1 : qty;

    let itemExist = await Cart.findOne({
        where:{
            [Op.and]:[
                { userId: userId },
                { productId: productId }
            ]
        }
    });
    
    let newCartItem = new Cart({
        userId: userId,
        productId: productId,
        totalQty: quantity,
        unitPrice: price,
        totalPrice: price * quantity
    });

    if (itemExist === undefined || itemExist == null){

        await newCartItem.save();
    }

    if (itemExist){
        
        let updateCart = await Cart.update({ totalQty: quantity, totalPrice: price * quantity},
          {
            where:{
                id: itemExist.id
            }
        });
    }

    res.redirect(`/product-details?id=${productId}`);
});

router.get('/shoping-cart', async function(req, res, next){

        let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

        let {qty, productId, price} = req.query;

        if (qty != undefined && productId != undefined){

            let updateCart = await Cart.update({ totalPrice: qty*price, totalQty: qty}, {
                where:{
                    userId:userId, productId:productId
                }
            });
        }

        let cartItem = await Cart.findAll({where:{
            userId : userId
        }});

        let products = await Product.findAll();

        var totalamount = [];

        cartItem.forEach(amount => {
              totalamount.push(amount.dataValues.totalPrice);
        }); 

        var sumamount = totalamount.reduce(function(a, b) {
            return a + b;
        }, 0);

    res.render('shoping-cart', {cartItem: cartItem, products: products, sumamount: sumamount});

});


router.get('/checkout', async function(req, res, next){

    let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

    let cartItem = await Cart.findAll({where:{
        userId : userId
    }});

    let categoryData = await Category.findAll();


    res.render('checkout',{cartItem:cartItem, categories: categoryData});
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.post('/email/contact', sendMessage, function(req, res){
    res.render('contact-success', {data: req.body});
});

router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


module.exports = router;