const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const pool = require('../../../db');
const queries = require('../queries');
const auth = require('../../utils/auth');
const password_management = require('../../utils/password_management');

// Sign in
router.post('', async (req, res, next) => {
    // Is this email already in use? 
    try {
        await auth.validateEmail(req.body.email);
    } catch(err) {
        res.sendStatus(409);
        return next('Email repeated');
    }

    let { email, password, name, restaurantName, phone, adress, description } = req.body;

    try {
        // Generating random ID for the restaurant
        const restaurant_id = uuidv4();
        // Store restaurant
        const restaurant = await createRestaurant(restaurant_id, restaurantName, phone, adress, description);
        // Encrypt password
        password = await password_management.gen_password(password);
        const user = await pool.query(queries.insertUser, [email, name, password, 'chef', restaurant_id]);
        res.sendStatus(201);
    } catch(err) {
        res.sendStatus(500);
        return next('Problem saving the user')
    }
    
})

// Create the restaurant with provided data
const createRestaurant = (restaurant_id, name, phone, adress, description) => {
    return new Promise (async (resolve, reject) => { 
        try {
            const result = await pool.query(queries.insertRestaurant, [restaurant_id, name, phone, adress, description]);
            return resolve(restaurant_id);
        } catch(err) {
            console.log(err)
            return reject('Problems creating the restaurant');
        }
    })

}


module.exports = router;
