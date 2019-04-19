const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('../queries');

router.get('/', async (req, res, next) => {

    let user = jwt.decode(req.cookies.TOKEN);

    try {
        // Search every user related to the restaurant using the restaurant_id of the token payload
        let team = await pool.query(queries.selectAllProfiles, [user.restaurant_id])
        // Transform array to object
        res.status(200).send(team);
    } catch(err) {
        res.sendStatus(404);
        return next(`Profiles not found`);
    }

})

// Delete a user from the team. This will erase the users's account
router.delete('/delete', async (req, res, next) => {

    const user_id = req.body.user_id
    let user = jwt.decode(req.cookies.TOKEN);

    try {
        // Delete the user
        let userData = await pool.query(queries.D_user, [user_id, user.restaurant_id])
        // Just the user object
        userData = userData[0][0];
        res.status(200).send(userData);
    } catch(err) {
        console.log(err)
        res.sendStatus(404);
        return next(`User with id ${user_id} not found`);
    }
})


module.exports = router;