const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Products list for PDF rendering
router.get('/', async (req, res, next) => {
    
        const user = jwt.decode(req.cookies.TOKEN);
    
        try {
            const data = await pool.query(queries.selectAllProducts, [user.restaurant_id]);
            // Empty table
            if (data.length === 0) {
                res.sendStatus(404);
                return next(`Products not found`);
            }
            // Response queried products and total registred products related with the restaurant
            res.status(200).send(data);
        } catch(err) {
            res.sendStatus(404);
            return next(`Products not found`);
        }
})

module.exports = router;