const router = require('express').Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Read last order for home
router.get('/last', async (req, res, next) => {
    const user = jwt.decode(req.cookies.TOKEN);
    try {
        let order = await pool.query(queries.selectLastOrder, [user.restaurant_id]);
        res.status(200).send(order[0]);
    } catch(err) {
        res.sendStatus(400);
        return next(`Problems reading your last order`)
    }
})

// Read one full order with items
router.get('/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        let order = await pool.query(queries.S_1_order, [req.params.id, user.restaurant_id]);
        const items = await pool.query(queries.selectItems, [req.params.id]);
        order = order[0][0];
        order.items = items;
        res.status(200).send(order);
    } catch(err) {
        res.status(404).send(null);
        return next(`Order with id ${req.params.id} not found`);
    }
    
})

// Read last 20 orders without items
router.get('/', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        let order = await pool.query(queries.S_20_order, [user.restaurant_id]);
        order = order[0];
        res.status(200).send(order);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
        return next(`Problems reading your orders`);
    }
    
})

module.exports = router;