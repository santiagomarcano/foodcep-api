const router = require('express').Router();
const pool = require('../../../../db');
const queries = require('../queries');
const auth = require('../../../../authentication/utils/auth');
const password_management = require('../../../../authentication/utils/password_management');

// Modify password
router.put('/modify', async (req, res, next) => {

    let { email, newPassword } = req.body

    try {
        // Encrypt new password
        const password = await password_management.gen_password(newPassword);
        let user = await pool.query(queries.updatePassword, [password, email])
        res.sendStatus(200)
    } catch(err) {
        res.sendStatus(404);
        return next(`User with email ${email} not found`);
    }

})

// Verify the actual password
router.post('/verify', async(req, res, next) => {
    let { email, currentPassword } = req.body;
    try {
    let password = await auth.authenticate(email, currentPassword);
    res.status(200).send(true);
    } catch(err) {
        res.status(422).send(false)
    }
})

module.exports = router;