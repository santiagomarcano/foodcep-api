const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('../queries');
const sessionQueries = require('../../../../authentication/routes/queries')


router.get('/', async (req, res, next) => {

    let user = jwt.decode(req.cookies.TOKEN);

    try {
        // Search every user related to the restaurant using the restaurant_id of the token payload
        let team = await pool.query(queries.selectAllProfiles, [user.restaurant_id, user.user_id])
        // Transform array to object
        res.status(200).send(team);
    } catch(err) {
        res.sendStatus(404);
        return next(`Profiles not found`);
    }

})

// Put the role of any user related to some restaurant
router.put('/user/', async (req, res, next) => {
    const user_id = req.body.user_id;
    const user = jwt.decode(req.cookies.TOKEN);

    try {
        const updatedUser = await pool.query(queries.U_restaurant_user, [req.body.role, user_id, user.restaurant_id]);
        // Makes the changed user log again with refreshed cookies with updated role
        const deleteUserSession = await handleUpdatedUserSession(user_id);
        res.status(200).send(updatedUser[0][0])
    } catch(err) {
        console.log(err)
        res.sendStatus(404);
        return next(`User with id ${user_id} not found`)
    }
})

// Delete a user from the team. This will erase the users's account
router.delete('/delete/:id', async (req, res, next) => {

    let user = jwt.decode(req.cookies.TOKEN);

    try {
        // Delete the user
        const deleteUserSession = await handleUpdatedUserSession(req.params.id);
        let userData = await pool.query(queries.D_user, [req.params.id, user.restaurant_id]);
        // Just the user object
        userData = userData[0][0];
        res.status(200).send(userData);
    } catch(err) {
        console.log(err)
        res.sendStatus(404);
        return next(`User with id ${req.params.id} not found`);
    }
})

const handleUpdatedUserSession = (user_id) => {
    return new Promise (async (resolve, reject) => {
        console.log(user_id);
        try {
            const session = await pool.query(sessionQueries.selectSession, [user_id]);
            console.log(session)
            // In case the user isn't logged
            if (session.length === 0) {
                console.log('wepa')
                return resolve('Nothing to handle');
            }
            console.log(session)
            const result = await pool.query(sessionQueries.deleteSession, [session[0].session_id]);
            const revoke = await pool.query(sessionQueries.insertRevoked, [session[0].session_id]);
            return resolve('Session handeled correctly');
            } catch(err) {
                console.log(err)
                return reject('Problems handling the user session');
            }
    })
    
}


module.exports = router;