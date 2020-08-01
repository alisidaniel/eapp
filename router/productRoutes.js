const express = require('express');
const {create, postCategory, productUpload} = require('../controllers/productController');

const router = express.Router();

router.post('/product', productUpload, function(req, res, next){
    res.send(res.data);
});

router.get('/product', function(req, res, next){
    res.render('product');
});

router.get('/category', function(req, res, next){
    res.render('category');
});

router.post('/category', postCategory, function(req, res, next){
    res.send(res.data);
});




module.exports = router;