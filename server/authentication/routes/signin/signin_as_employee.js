const express = require('express');
const router = express.Router();
const pool = require('../../../db');
const queries = require('../queries');
const auth = require('../../utils/auth');
const password_management = require('../../utils/password_management');
const verification_code = require('../../utils/verification_code');

// Sign in
router.post('/:id', async (req, res, next) => {

    // Is this email already in use? 
    try {
        await auth.validateEmail(req.body.email);
    } catch(err) {
        res.sendStatus(409);
        return next('Email repeated');
    }

    let { email, password, name, language, currency } = req.body;

    try {
        // Is active invitation?
        const invitation = await pool.query(queries.selectInvitation, [req.params.id]);
        const invitationData = invitation[0];
        // If the invitation doesn't exists
        if (invitation.length === 0) {
            res.sendStatus(422);
            return next('Invalid invitation')
        }
        // Encrypt password
        generatedPassword = await password_management.gen_password(password);
        const user = await pool.query(queries.IS_user, [email, name, generatedPassword, invitationData.role, language, currency, invitationData.restaurant_id]);
        // Delete the invitation
        const deleteInvitaton = await pool.query(queries.D_invitation, [invitationData.invitation_id]);
        // Creates the code to verify the user's email
        const verify = await verification_code.createVerificationCode(user[0][0].user_id, email);
        res.status(201).send({ msg: 'User created' });
    } catch(err) {
        res.sendStatus(500);
        return next('Problem saving the user')
    }
    
})

module.exports = router;