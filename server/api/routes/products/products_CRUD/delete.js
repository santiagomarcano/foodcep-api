const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../../../../db');
const queries = require('./queries');

router.delete('/:id', async (req, res, next) => {

    const user = jwt.decode(req.cookies.TOKEN);
    try {
        updateRelatedDishCost(req.params.id, user.restaurant_id);
        let product = await pool.query(
            queries.DS_product,
            [req.params.id, user.restaurant_id]
        );
        // Just product object
        product = product[0][0];
        res.status(200).send(product);
    } catch(err) {
        res.sendStatus(400)
        return next(err.stack)
    }

})


const updateRelatedDishCost = (product_id, restaurant_id) => {

            pool.query(queries.selectDishesToUpdate, [product_id, restaurant_id], (err, rows, fields) => {
                console.log(rows)
                rows.forEach((dish) => {
                    pool.query(queries.U_dish_cost, [dish.dish_id], (err, rows, fields) => {
                        console.log(rows)
                    });
                })
            });
}

module.exports = router;