const express = require('express');
const {store, update} = require('../controllers/shippingController');

const router = express.Router();


router.post('/add/shipping', store);

module.exports = router;