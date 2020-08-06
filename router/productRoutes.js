const express = require('express');
const {create, postCategory} = require('../controllers/productController');

const db = require('../models');
const Category = db.Category;

const router = express.Router();

router.post('/product', create, function(req, res, next){
    res.send(res.data);
});

router.get('/product', async function(req, res, next){
    let categoryData = await Category.findAll();
    res.render('product', {categories: categoryData});
});

router.get('/category', function(req, res, next){
    res.render('category');
});

router.post('/category', postCategory, function(req, res, next){
    res.send(res.data);
});




module.exports = router;