const router = require('express').Router();
const pool = require('../../../../db');
const queries = require('../queries');

router.put('/update', async (req, res, next) => {

    const { user_id, language } = req.body;
    
    // Make changes
    try {
        let user = await pool.query(queries.US_user_language, [user_id, language]);
        // User object
        user = user[0][0];
        // Set the new language as cookie
        res.cookie('LANGUAGE', user.language);
        res.status(200).send(user);
    } catch(err) {
        res.sendStatus(404);
        return next('User not found');
    }

})

module.exports = router;