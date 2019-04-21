const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Get one product
router.get('/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        const result = await pool.query(queries.selectOneProduct, [user.restaurant_id, req.params.id]);
        res.status(200).send(result);
    } catch(err) {
        res.sendStatus(404)
        return next(`Product with id ${req.params.id} not found`);
    }
    
})

// Get all products
router.get('/', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        const result = await pool.query(queries.selectAllProducts, [user.restaurant_id]);
        res.status(200).send(result);
    } catch(err) {
        res.sendStatus(400);
        return next(`Problems getting your products`);
    }
    
})

module.exports = router;