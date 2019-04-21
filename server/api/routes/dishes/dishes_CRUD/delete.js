const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('./queries');

router.delete('/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);
    try {
        let dish = await pool.query(queries.DS_dish, [req.params.id, user.restaurant_id]);
        // Just dish object
        dish = dish[0][0];
        res.status(200).send(dish);
    } catch(err) {
        res.sendStatus(400)
        return next(err.stack)
    }

})

module.exports = router;