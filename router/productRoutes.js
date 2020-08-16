const express = require('express');
const { isAdmin } = require('../middleware/auth');
const {create, postCategory} = require('../controllers/productController');

const db = require('../models');
const Category = db.Category;

const router = express.Router();

router.post('/product', isAdmin, create, function(req, res, next){
    res.send(res.data);
});

router.get('/product', isAdmin, async function(req, res, next){

    let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;
    
    let categoryData = await Category.findAll();

    res.render('product', {categories: categoryData, data: req.session.user});
});

router.get('/category', isAdmin, async function(req, res, next){

    let userId = req.session.user === undefined ? req.cookies.user_sid : req.session.user.id;

    let categoryData = await Category.findAll();

    res.render('category',{categories: categoryData, data: req.session.user});
});

router.post('/category', isAdmin, postCategory, function(req, res, next){
    res.send(res.data);
});


module.exports = router;