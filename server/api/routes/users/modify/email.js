const router = require('express').Router();
const pool = require('../../../../db');
const auth = require('../../../../authentication/utils/auth');
const queries = require('../queries');

router.put('/modify', async (req, res, next) => {

    const { email, password, newEmail } = req.body;

    // Check valid credentials
    try {
        let user = await auth.authenticate(email, password);
    } catch(err) {
        res.sendStatus(422);
        return next('Wrong password');
    }

    // Check if is already in use
    try {
        const validEmail = await auth.validateEmail(newEmail);
    } catch(err) {
        res.status(409).send(email);
        return next('Email repeated');
    }

    // Make changes
    try {
        let user = await pool.query(queries.US_user_email, [email, newEmail]);
        // User object
        console.log(user);
        user = user[0][0];
        res.status(200).send(user);
    } catch(err) {
        res.sendStatus(404);
        return next('User not found');
    }

})

module.exports = router;