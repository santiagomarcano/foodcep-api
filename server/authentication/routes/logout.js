const express = require('express');
const router = express.Router();
const pool = require('../../db');
const queries = require('./queries');

const clearCookies = (response) => {
    response.clearCookie('TOKEN');
    response.clearCookie('ROLE');
    response.clearCookie('USER');
    response.clearCookie('RESTAURANT_ID');
    return response;
}

// Log out
router.post('/', async (req, res, next) => {
    const session = req.cookies.SESSION_ID;

    if (session !== undefined) {

    try {
        const result = await pool.query(queries.deleteSession, [session]);
        const revoke = await pool.query(queries.insertRevoked, [session])
        res = clearCookies(res);
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(404);
        return next('Invalid Credentials');
    }

    } else {
        res.sendStatus(400);
        return next('Nothing to log out');
    }
    
})

module.exports = router;