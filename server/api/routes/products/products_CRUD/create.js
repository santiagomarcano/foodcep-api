const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('./queries');

// Create a product
router.post('/', async (req, res, next) => {
    
    const user = jwt.decode(req.cookies.TOKEN);
    const { name, price, loss, cost, category } = req.body;
    try {
        let product = await pool.query(
            queries.IS_product,
            [name, price, loss, cost, category, user.restaurant_id]
        );
        product = product[0][0]
        res.status(200).send(product);
    } catch(err) {
        res.sendStatus(400)
        return next(err.stack)
    }

})

module.exports = router;
