const router = require('express').Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// Create dish
router.post('/', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);
    const { name, category, cost, ingredients } = req.body;
    try {
        // Insert dish row and return dish_id
        let dishResult = await pool.query(queries.IS_dish, [name, category, cost, user.restaurant_id]);
        // Just dish object
        dishResult = dishResult[0][0];
        // Insert rows on ingredients table
        const insertIngredients = await pool.query(queries.INSERT_INGREDIENTS(ingredients, dishResult.dish_id));
        // Select all the rows related with the dish
        const ingredientsResult = await pool.query(queries.selectIngredients, [dishResult.dish_id]);
        // Nested array of objects
        dishResult.ingredients =  ingredientsResult;
        res.status(200).send(dishResult);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
        return next(`Problems inserting your dish`);
    }
    
})

module.exports = router;