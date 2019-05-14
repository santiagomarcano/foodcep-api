const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const jwt = require('jsonwebtoken');
const queries = require('./queries');

// Delete recipe
router.delete('/:id', async (req, res, next) => {
    
    const id = req.params.id;

    try {
    let result = await pool.query(queries.deleteRecipe, [id]);
    res.status(200).send({ msg: 'Recipe deleted' });
    } catch(err) {
        res.sendStatus(400);
        return next('Problems deleting your recipe');
    }
})

module.exports = router;