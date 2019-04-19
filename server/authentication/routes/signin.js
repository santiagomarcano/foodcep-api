const express = require('express');
const router = express.Router();
const pool = require('../../db');
const queries = require('./queries');
const auth = require('../utils/auth');
const password_management = require('../utils/password_management');

// Sign in
router.post('/', async (req, res, next) => {
    // Is this email already in use? 
    try {
        await auth.validateEmail(req.body.email);
    } catch(err) {
        res.sendStatus(409);
        return next('Email repeated');
    }

    let { email, password, name } = req.body;

    try {
        // Encrypt password
        password = await password_management.gen_password(password);
        const user = await pool.query(queries.insertUser, [email, password, name]);
        res.sendStatus(201);
    } catch(err) {
        res.sendStatus(500);
        return next('Problem saving the user')
    }
    
})

module.exports = router;
