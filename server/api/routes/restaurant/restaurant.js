const express = require('express');
const router = express.Router();
const pool = require('../../../db');
const jwt = require('jsonwebtoken');
const queries = require('./queries');

router.put('/modify', async (req, res, next) => {

    const { name, phone, adress, description } = req.body;
    const user = jwt.decode(req.cookies.TOKEN);

    try {
    let result = await pool.query(queries.US_restaurant, [user.restaurant_id, name, phone, adress, description]);
    // Converting the array to just the restaurant object
    result = result[0][0]
    res.status(200).send(result);
    } catch(err) {
        res.sendStatus(400);
        return next('Problems modifiying restaurant data');
    }

})

module.exports = router;