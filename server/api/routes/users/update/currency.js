const router = require('express').Router();
const pool = require('../../../../db');
const queries = require('../queries');

router.put('/update', async (req, res, next) => {
    const { symbol, user_id } = req.body;
    // Check valid credentials
    try {
        let currencies = await pool.query(queries.US_user_currency, [user_id, symbol]);
        // Just the user object
        res.cookie('CURRENCY', symbol);
        res.status(200).send(currencies[0][0]);
    } catch(err) {
        res.sendStatus(500);
        return next('Problems updating the currency');
    }

})

module.exports = router;