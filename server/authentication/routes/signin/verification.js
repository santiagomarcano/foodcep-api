const router = require('express').Router();
const pool = require('../../../db');
const verification_code = require('../../utils/verification_code');
const queries = require('../queries');
const path = require('path');

// Resend the verification on demand
router.post('/resend/', async (req, res, next) => {
    const user_id = req.body.user_id;

    try {
    const userEmail = await pool.query(queries.selectEmailWithID, [user_id]);
    const createVerification = await verification_code.createVerificationCode(user_id, userEmail[0].email);
    res.status(200).send({ msg: 'Verification link resended' });
    } catch(err) {
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
    } catch(err) {
        res.sendFile(path.join(__dirname, './wrong-verification.html'));
    }
})

module.exports = router;