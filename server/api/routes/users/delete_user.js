const router = require('express').Router();
const pool = require('../../../db');
const auth = require('../../../authentication/utils/auth');
const queries = require('./queries');

router.put('', async (req, res, next) => {

    const { email, password } = req.body;

    // Check valid credentials
    try {
        let user = await auth.authenticate(email, password);
    } catch(err) {
        res.sendStatus(422);
        return next('Wrong password');
    }

    // Delete
    try {
        let user = await pool.query(queries.deleteUserWithEmail, [email]);
        res.sendStatus(200)
    } catch(err) {
        res.sendStatus(404);
        return next('User not found');
    }

})

module.exports = router;