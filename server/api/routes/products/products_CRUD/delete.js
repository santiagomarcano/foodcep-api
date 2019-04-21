const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('./queries');

router.delete('/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);
    try {
        let product = await pool.query(
            queries.DS_product,
            [req.params.id, user.restaurant_id]
        );
        // Just product object
        product = product[0][0];
        res.status(200).send(product);
    } catch(err) {
        res.sendStatus(400)
        return next(err.stack)
    }

})

module.exports = router;