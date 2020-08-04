var express = require('express');
var {sendMessage} = require('../controllers/contactController');
var {login, register} = require('../controllers/authController');
var {account, updateRecord} = require('../controllers/userController');
var {sessionChecker} = require('../middleware/auth');

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
router.get('/', function(req, res, next){
    res.render('index');
});

router.get('/index', function(req, res, next){
    res.render('index');
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