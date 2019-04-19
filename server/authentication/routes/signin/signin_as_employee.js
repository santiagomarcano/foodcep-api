const express = require('express');
const router = express.Router();
const pool = require('../../../db');
const queries = require('../queries');
const auth = require('../../utils/auth');
const password_management = require('../../utils/password_management');

// Sign in
router.post('/:id', async (req, res, next) => {

    // Is this email already in use? 
    try {
        await auth.validateEmail(req.body.email);
    } catch(err) {
        res.sendStatus(409);
        return next('Email repeated');
    }

    let { email, password, name } = req.body;

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
        password = await password_management.gen_password(password);
        const user = await pool.query(queries.insertUser, [email, name, password, invitationData.role, invitationData.restaurant_id]);
        // Delete the invitation
        const deleteInvitaton = await pool.query(queries.D_invitation, [invitationData.invitation_id]);
        res.sendStatus(201);
    } catch(err) {
        // console.log(err);
        res.sendStatus(500);
        return next('Problem saving the user')
    }
    
})

module.exports = router;