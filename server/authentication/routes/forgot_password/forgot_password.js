const express = require('express');
const router = express.Router();
const pool = require('../../../db');
const queries = require('./queries');
const uuidv4 = require('uuid/v4');
const forgot_email = require('./forgot_email');
const password_management = require('../../utils/password_management');

// Login
router.get('/', async (req, res, next) => {

    const email = req.query.email;
    const code = uuidv4();
    try {
        const user = await pool.query(queries.selectUser, [email])
        if (user.length === 0) {
            res.sendStatus(404);
            return next('User not found');
        }
        const insertCode = await pool.query(queries.insertCode, [user[0].user_id, code]);
        // In case we don't have that email. Cancel everything
        const event = await pool.query(queries.EVENT(), [code]);
        const sendEmail = await forgot_email.sendEmail(email, code);
        res.status(200).send({ msg: 'Forgot code sended'});
    } catch(err) {
        res.sendStatus(404);
        return next(`User with email ${email} not found`);
    }
    
})

router.post('/update', async (req, res, next) => {

    const { code, newPassword } = req.body;

    try {
        // Encrypt new password
        const forgotCode = await pool.query(queries.DS_forgot_code, [code])
        if (forgotCode[0][0].length === 0) {
            res.status(404).send({ msg: 'Code not found'});
        }
        const encrypt = await password_management.gen_password(newPassword);
        let user = await pool.query(queries.updatePassword, [encrypt, forgotCode[0][0].user_id])
        res.status(200).send({ msg: 'Password changed!'})
    } catch(err) {
        res.sendStatus(404);
        return next(`Forgot code ${code} not found`);
    }

})

module.exports = router;