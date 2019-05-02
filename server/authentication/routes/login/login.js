const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');
const login_cookies = require('./login_cookies');
const session_service = require('../../utils/session_service');

// Login
router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Autheticate user and password
        const credentials = await auth.authenticate(email, password);
        // User is not verified 
        if (credentials.verification === 0) {
            res.status(406).send({ verification: credentials.verification, user: credentials.user_id });
            return;
        }
        const session = session_service.generateSession(credentials);
        // Store the previous generated session on DB
        const storedSession = await auth.storeSession(session.id, credentials.user_id);
        // Setting cookies
        res = login_cookies.setCookies(res, session, credentials);
        res.status(200).send({ verification: credentials.verification });
    } catch(err) {
        res.sendStatus(422);
        return next('Invalid Credentials');
    }
    
})

module.exports = router;
