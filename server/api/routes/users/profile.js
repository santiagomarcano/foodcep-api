const router = require('express').Router();
const pool = require('../../../db');
const queries = require('./queries');

router.get('/profile', async (req, res, next) => {

    let session = req.cookies.SESSION_ID;

    try {
        let user = await pool.query(queries.selectUserBasedOnSessionID, [session])
        // Transform array to object
        user = user[0];
        res.status(200).send(user);
    } catch(err) {
        res.sendStatus(404);
        return next(`User with session ${session} not found`);
    }

})

module.exports = router;