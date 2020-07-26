var express = require('express');
var {sendMessage} = require('../controllers/contactController');
var router = express.Router();

/* GET home page. */
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


module.exports = router;