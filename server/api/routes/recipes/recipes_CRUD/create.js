const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Create recipe
router.post('/', async (req, res, next) => {
    
    const { dish_id, minimum_production, recipe } = req.body;
    const user = jwt.decode(req.cookies.TOKEN);

    try {
    let result = await pool.query(queries.IS_recipe, [dish_id, minimum_production, recipe, user.restaurant_id]);
    result = result[0][0];
    res.status(201).send(result);
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
        return next('Problems creating your recipe');
    }
})

module.exports = router;