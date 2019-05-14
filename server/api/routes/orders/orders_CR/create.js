const router = require('express').Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Create a order
router.post('/', async (req, res, next) => {
    
    const user = jwt.decode(req.cookies.TOKEN);
    const { supplier, items } = req.body;
    try {
        // Insert order row and return order_id
        let orderResult = await pool.query(queries.IS_order, [supplier, user.user_id, user.restaurant_id]);
        // Just order object
        orderResult = orderResult[0][0];
        // Insert rows on ingredients table
        const insertItems = await pool.query(queries.INSERT_ORDER_ITEMS(items, orderResult.order_id));
        // Select all the rows related with the dish
        let order = await pool.query(queries.S_1_order, [orderResult.order_id, user.restaurant_id]);
        order = order[0][0];
        res.status(200).send(order);
    } catch(err) {
        res.sendStatus(400);
        return next(`Problems creating your order`);
    }
    
})

module.exports = router;

