const express = require('express');
const pool = require('../../../db');
const queries = require('./queries');
const router = express.Router();

router.get('/:id', async (req, res, next) => {

    try {
        const result = await pool.query(queries.selectProducts, [req.params.id]);
        res.status(200).send(result);
    } catch(err) {
        res.sendStatus(400)
        return next(err);
    }
    
})

router.post('/', async (req, res, next) => {

    try {
        const result = await pool.query(queries.inserProducts, [req.params.id]);
    } catch(err) {
        res.sendStatus(400)
        return next(err.stack)
    }

})

module.exports = router;