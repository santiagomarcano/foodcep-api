const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Create a supplier
router.post('/', async (req, res, next) => {

    const { name, email, phone, comertial } = req.body;
    const user = jwt.decode(req.cookies.TOKEN);
    try {
        let result = await pool.query(queries.IS_supplier, [name, email, phone, comertial, user.restaurant_id]);
        // Just the created object
        result = result[0][0];
        res.status(200).send(result);
    } catch(err) {
        res.sendStatus(400);
        return next(`Problems creating your supplier`);
    }
    
})

module.exports = router;