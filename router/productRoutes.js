const express = require('express');
const {create} = require('../controllers/productController');

const router = express.Router();

router.post('/products', create, function(req, res, next){
    res.send(res.data);
});


module.exports = router;