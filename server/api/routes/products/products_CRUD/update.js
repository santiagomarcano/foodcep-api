const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('./queries');

router.put('/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);
    const { name, price, loss, cost, category } = req.body;
    try {
        // Select category with categories.name and categories.restaurant_id
        let id = await pool.query(queries.selectCategory, [category, user.restaurant_id]);
        id = id[0].category_id;
        let product = await pool.query(
            queries.US_product,
            [req.params.id, name, price, loss, cost, id, user.restaurant_id]
        );
        // Just product object
        product = product[0][0];
        res.status(200).send(product);
    } catch(err) {
        res.sendStatus(400)
        return next(err.stack)
    }
    await updateRelatedDishCost(req.params.id, user.restaurant_id);
})

const updateRelatedDishCost = (product_id, restaurant_id) => {
    return new Promise (async (resolve, reject) => {
        console.log(product_id)
        try {
            const dishesToUpdate = await pool.query(queries.selectDishesToUpdate, [product_id, restaurant_id]);
            console.log(dishesToUpdate);
            dishesToUpdate.forEach(async (dish) => {
                await pool.query(queries.U_dish_cost, [dish.dish_id]);
            })
            resolve('greay')
        } catch(err) {
            reject (err)
        }

    })
}


module.exports = router;