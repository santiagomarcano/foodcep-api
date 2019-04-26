const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Update a supplier
router.put('/:id', async (req, res, next) => {

    const { name, email, phone, comertial } = req.body;
    const user = jwt.decode(req.cookies.TOKEN);

    try {
        let result = await pool.query(queries.US_supplier, [req.params.id, name, email, phone, comertial, user.restaurant_id]);
        // Just updated document
        result = result[0][0];
        res.status(200).send(result);
    } catch(err) {
        res.sendStatus(404)
        return next(`Supplier with id ${req.params.id} not found`);
    }
    
})

module.exports = router;