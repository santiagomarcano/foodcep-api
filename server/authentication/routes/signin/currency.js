const router = require('express').Router();
const pool = require('../../../db');
const queries = require('../../../api/routes/users/queries');

router.get('/', async (req, res, next) => {
;
    // Check valid credentials
    try {
        let currencies = await pool.query(queries.selectCurrencies);
        res.status(200).send(currencies);
    } catch(err) {
        console.log(err)
        res.sendStatus(500);
        return next('Problems getting the currencies');
    }

})

module.exports = router;