const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('../queries');
const uuidv4 = require('uuid/v4');

router.post('/', async (req, res, next) => {

    let user = jwt.decode(req.cookies.TOKEN);
    console.log(req.body);
    const invitation_id = uuidv4();
    try {
        // Insert invitation link into DB
        const link = await pool.query(queries.I_invitation, [invitation_id, user.restaurant_id, req.body.role]);
        // Event to expire the invitation
        const expiration = await pool.query(queries.EVENT(), [invitation_id]);
        res.status(200).send({ code: invitation_id});
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
        return next(`Problems generating your invitation`);
    }

})

module.exports = router;