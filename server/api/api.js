const express = require('express');
const api = express.Router();

const user_module = require('./routes/users/module');
const products_module = require('./routes/products/module');
const dishes_module = require('./routes/dishes/module');
const restaurant = require('./routes/restaurant/restaurant');

api.use('/user', user_module);
api.use('/products/', products_module);
api.use('/dishes', dishes_module);
api.use('/restaurant', restaurant);


module.exports = api;