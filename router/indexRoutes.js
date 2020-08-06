var express = require('express');
var {sendMessage} = require('../controllers/contactController');
var {login, register} = require('../controllers/authController');
var {account, updateRecord} = require('../controllers/userController');
var {sessionChecker} = require('../middleware/auth');


const db = require('../models');
const Category = db.Category;
const Product  = db.Product;

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
    let categoryData = await Category.findAll();
    
    res.render('index', {categories: categoryData});
});

router.get('/index', async function(req, res, next){ 
    let categoryData = await Category.findAll();
    let productData = await Product.findAll();
    // console.log(JSON.stringify(categoryData));
    res.render('index', {categories: categoryData, products: productData});
});

router.get('/account', sessionChecker, account);

/* profile page. */
router.get('/profile', sessionChecker, function(req, res, next){
    console.log(req.session.user);
    res.render('profile', {data: req.session.user});
});

router.post('/profile', sessionChecker, updateRecord);

router.get('/about', function(req, res, next){
    res.render('about');
});

router.get('/shop-details', sessionChecker, function(req, res, next){
    res.render('shop-details');
});

router.get('/shop-grid', function(req, res, next){
    res.render('shop-grid');
});

router.get('/shoping-cart', function(req, res, next){
    res.render('shoping-cart');
});

router.get('/checkout', function(req, res, next){
    res.render('checkout');
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