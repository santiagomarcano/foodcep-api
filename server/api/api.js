const express = require('express');
const api = express.Router();

const user_module = require('./routes/users/module');
const products = require('./routes/products/products');
const restaurant = require('./routes/restaurant/restaurant');

api.use('/user', user_module)
api.use('/restaurant', restaurant);
api.use('/products/', products);


module.exports = api;