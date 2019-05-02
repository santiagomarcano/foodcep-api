const router = require('express').Router();
const nodemailer_connection = require('../../../nodemailer_pool');
const pool = require('../../../db');
const verification_code = require('../../utils/verification_code');
const queries = require('../queries');
const path = require('path');

// Resend the verification on demand
router.post('/resend/:id', async (req, res, next) => {

    const user_id = req.params.id;

    try {
    const userEmail = await pool.query(queries.selectEmailWithID, [user_id]);
    console.log(userEmail[0].email)
    const createVerification = await verification_code.createVerificationCode(user_id, userEmail[0].email);
    res.status(200).send({ msg: 'Verification link resended' });
    } catch(err) {
        console.log(err)
        res.sendStatus(504);
        return next('Problems creating and sending the verification code')
    }
})

router.get('/', async (req, res, next) => {

    const code = req.query.code;

    try {
        const verification = await pool.query(queries.selectVerification, [code]);
        const user = await pool.query(queries.verifyUser, [verification[0].user_id]);
        res.sendFile(path.join(__dirname, './verification-view.html'))
        // res.status(200).send({ msg: 'User verified' });
    } catch(err) {
        res.redirect(304, 'http://google.com');
        return next('Problems confirming your verification. Maybe its expired or unnecesary')
    }
})

module.exports = router;