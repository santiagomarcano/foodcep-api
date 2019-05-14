const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const jwt = require('jsonwebtoken');
const queries = require('./queries');

// Update recipe
router.put('/:id', async (req, res, next) => {

    const id = req.params.id;
    const { recipe, minimum_production } = req.body;

    try {
    let result = await pool.query(queries.US_recipe, [id, minimum_production, recipe]);
    result = result[0][0];
    res.status(200).send(result);
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
        return next('Problems updating your recipe');
    }
})

module.exports = router;