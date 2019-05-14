const express = require('express');
const router = express.Router();
const pool = require('../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');
const session_service = require('../utils/session_service');

// Setting cookies
const setCookies = (response, session, user) => {
    response.cookie('TOKEN', session.token, {
        maxAge: 24 * 60 * 60 * 1000,
        withCredentials: true,
        httpOnly: true,
        //secure: true
    });
    response.cookie('SESSION_ID', session.id, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true
    });
    response.cookie('USER', user.name, {
        maxAge: 24 * 60 * 60 * 1000
    });
    response.cookie('ROLE', user.role, {
        maxAge: 24 * 60 * 60 * 1000
    })
    return response;
}

// Refresh
router.post('/', async (req, res, next) => {

    if (req.cookies !== undefined) {

        jwt.verify(req.cookies.TOKEN, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                //console.log(err)
                try {
                    // Take the user based on the stored session
                    const user = await pool.query(queries.selectUserOnRefresh, req.cookies.SESSION_ID);
                    if (user.length === 0) {
                        throw new Error('Invalid session');
                    }
                    // Sign new token and generates new session
                    const session = session_service.generateSession(user[0]);
                    // Update the stored session
                    const refreshSession = await pool.query(queries.updateSession, [session.id, req.cookies.SESSION_ID]);
                    // Throw error if there's no valid session
                    if (refreshSession.affectedRows === 0) {
                        throw new Error('Invalid session');
                    }
                    res = setCookies(res, session, user[0]);
                    res.status(200).send({ msg: "OK" });
                } catch(err) {
                    res.sendStatus(403);
                    return next('Invalid Credentials');
                }
            }
            if (decoded) {
                res.sendStatus(406);
                return next('Nothing to refresh');
            }
        })
    }
})

module.exports = router;