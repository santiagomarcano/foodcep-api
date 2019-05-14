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

// Get products with query
router.get('/', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);
    const page = parseInt(req.query.page) * 5;
    const expression = req.query.product + '%';

    try {
        const data = await pool.query(queries.selectProductsWithQuery, [user.restaurant_id, expression, page]);
        const rows = await pool.query(queries.rowsCount, [user.restaurant_id]);
        // Empty table
        if (rows.length === 0) { 
            res.status(200).send({ data: data, count: rows[0].count });
        }
        // Query didnt found any product
        if (data.length === 0) {
            res.sendStatus(404);
            return next(`Product not found`);
        }
        // Response queried products and total registred products related with the restaurant
        res.status(200).send({ data: data, count: rows[0].count });
    } catch(err) {
        res.sendStatus(404);
        return next(`Product not found`);
    }
    
})




module.exports = router;