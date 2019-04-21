const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Get all categories
router.get('/', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        const result = await pool.query(queries.selectAllCategories, [user.restaurant_id]);
        res.status(200).send(result);
    } catch(err) {
        res.sendStatus(400);
        return next(`Problems getting your categories`);
    }
    
})

module.exports = router;