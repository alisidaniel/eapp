var express = require('express');
var {sendMessage} = require('../controllers/contactController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
    res.render('index');
});

router.get('/about', function(req, res, next){
    res.render('about');
});

router.post('/email/contact', sendMessage, function(req, res){
    res.render('contact-success', {data: req.body});
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});


module.exports = router;