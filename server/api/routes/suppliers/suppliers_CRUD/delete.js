const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Update a supplier
router.delete('/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        let result = await pool.query(queries.DS_supplier, [req.params.id, user.restaurant_id]);
        result = result[0][0];
        res.status(200).send(result);
    } catch(err) {
        res.sendStatus(404)
        return next(`Supplier with id ${req.params.id} not found`);
    }
    
})

module.exports = router;