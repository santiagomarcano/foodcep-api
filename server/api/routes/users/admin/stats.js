const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('../queries');

router.get('/', async (req, res, next) => {

    let user = jwt.decode(req.cookies.TOKEN);
    try {
        // Insert invitation link into DB
        const stats = await pool.query(queries.selectStats, [user.restaurant_id]);
        res.status(200).send(stats[0][0]);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
        return next(`Problems getting your stats`);
    }

})

module.exports = router;