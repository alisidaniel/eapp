var express = require('express');
var {sendMessage} = require('../controllers/contactController');
var {login, register} = require('../controllers/authController');
var {account} = require('../controllers/userController');
var auth = require('../middleware/auth');
var router = express.Router();

/* GET home page. */

router.post('/register', register, function(req, res, next){
    res.send(res.data);
});

router.post('/account', login);

router.get('/account', auth, account);

router.get('/login', function(req, res, next){
    res.render('login');
});

router.get('/register', function(req, res, next){
    res.render('register');
});

router.get('/', function(req, res, next){
    res.render('index');
});

router.get('/index', function(req, res, next){
    res.render('index');
});

router.get('/about', function(req, res, next){
    res.render('about');
});

router.get('/shop-details', function(req, res, next){
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

router.get(function(req, res, next){
    res.render('404');
});


module.exports = router;