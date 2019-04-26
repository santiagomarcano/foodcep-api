const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const session_service = require('../utils/session_service');

// Setting cookies
const setCookies = (response, session, credentials) => {
    response.cookie('TOKEN', session.token, {
        maxAge: 24 * 60 * 60 * 1000,
        withCredentials: true,
        httpOnly: true,
        //secure: true
    });
    response.cookie('SESSION_ID', session.id, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    });
    response.cookie('USER', credentials.name, {
        maxAge: 24 * 60 * 60 * 1000
    });
    response.cookie('ROLE', credentials.role, {
        maxAge: 24 * 60 * 60 * 1000
    });
    response.cookie('LANGUAGE', credentials.language, {
        maxAge: 24 * 60 * 60 * 1000
    });
    return response;
}

// Login
router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        // Autheticate user and password
        const credentials = await auth.authenticate(email, password);
        const session = session_service.generateSession(credentials);
        // Store the previous generated session on DB
        const storedSession = await auth.storeSession(session.id, credentials.user_id);
        // Setting cookies
        res = setCookies(res, session, credentials);
        res.status(200).send({ msg: 'User succesfully logged'});
    } catch(err) {
        res.sendStatus(422);
        return next('Invalid Credentials');
    }
    
})

module.exports = router;
