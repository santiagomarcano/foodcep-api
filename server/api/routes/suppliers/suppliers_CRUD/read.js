const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Read all suppliers related to one restaurant
router.get('/', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        const result = await pool.query(queries.selectAllSuppliers, [user.restaurant_id]);
        res.status(200).send(result);
    } catch(err) {
        res.sendStatus(404)
        return next(`Suppliers not found`);
    }
    
})

// Read one supplier related with a restaurant
router.get('/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        let result = await pool.query(queries.selectOneSupplier, [req.params.id, user.restaurant_id]);
        result = result[0]
        res.status(200).send(result);
    } catch(err) {
        res.sendStatus(404)
        return next(`Supplier with id ${req.params.id} not found`);
    }
    
})

module.exports = router;