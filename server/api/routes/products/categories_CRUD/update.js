const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('./queries');

router.put('/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);
    const { name } = req.body;
    try {
        let category = await pool.query(queries.US_category, [req.params.id, name, user.restaurant_id]);
        // Just category object
        category = category[0][0];
        res.status(200).send(category);
    } catch(err) {
        res.sendStatus(400)
        return next(err.stack)
    }

})

module.exports = router;