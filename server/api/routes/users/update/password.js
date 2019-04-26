const router = require('express').Router();
const pool = require('../../../../db');
const queries = require('../queries');
const auth = require('../../../../authentication/utils/auth');
const password_management = require('../../../../authentication/utils/password_management');

// Update password
router.put('/update', async (req, res, next) => {

    let { email, currentPassword, newPassword } = req.body
    try {
    let password = await auth.authenticate(email, currentPassword);
    } catch(err) {
        res.status(422).send({ msg: 'Wrong password'})
        return next('Wrong password');
    }

    try {
        // Encrypt new password
        const password = await password_management.gen_password(newPassword);
        let user = await pool.query(queries.updatePassword, [password, email])
        res.status(200).send({ msg: 'Password changed!'})
    } catch(err) {
        res.sendStatus(404);
        return next(`User with email ${email} not found`);
    }

})


module.exports = router;