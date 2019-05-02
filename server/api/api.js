const express = require('express');
const api = express.Router();

const user_module = require('./routes/users/module');
const products_module = require('./routes/products/module');
const dishes_module = require('./routes/dishes/module');
const suppliers_module = require('./routes/suppliers/module');
const restaurant_module = require('./routes/restaurant/module');
const orders_module = require('./routes/orders/module');



    api.use('/user/', user_module);
    api.use('/products/', products_module);
    api.use('/dishes/', dishes_module);
    api.use('/restaurant/', restaurant_module);
    api.use('/suppliers/', suppliers_module);
    api.use('/orders', orders_module);





module.exports = api;