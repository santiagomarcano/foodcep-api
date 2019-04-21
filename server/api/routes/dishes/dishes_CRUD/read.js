const router = require('express').Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Read all dishes on dishes entity related with the restaurant
router.get('/', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        const dishesResult = await pool.query(queries.selectDishes, [user.restaurant_id]);
        res.status(200).send(dishesResult);
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
        return next(`Problems getting your dishes`);
    }
    
})

// Read one dish and return it without ingredients
router.get('/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        const dishesResult = await pool.query(queries.selectDishes, [user.restaurant_id]);
        res.status(200).send(dishesResult);
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
        return next(`Problems getting your dishes`);
    }
    
})

// Read one dish and return it with ingredients
router.get('/complete/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);

    try {
        let dishResult = await pool.query(queries.selectDish, [req.params.id, user.restaurant_id]);
        const ingredientsResult = await pool.query(queries.selectIngredients, [req.params.id]);
        // Just dish object
        dishResult = dishResult[0];
        // Ingredients property
        dishResult.ingredients = ingredientsResult;
        res.status(200).send(dishResult)
    } catch(err) {
        res.sendStatus(400);
        return next(`Dish with id ${req.params.id} not found`);
    }
})

module.exports = router;