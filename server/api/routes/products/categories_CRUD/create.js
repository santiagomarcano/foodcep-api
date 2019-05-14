const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('./queries');

// Create a product
router.post('/', async (req, res, next) => {
    
    const user = jwt.decode(req.cookies.TOKEN);
    const { name } = req.body;
    console.log(name)
    try {
        let category = await pool.query(queries.IS_category, [name, user.restaurant_id]);
        category = category[0][0]
        res.status(200).send(category);
    } catch(err) {
        res.sendStatus(400)
        return next(err.stack)
    }

})

module.exports = router;