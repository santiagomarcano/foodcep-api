const express = require('express');
const router = express.Router();
const pool = require('../../../../db');
const jwt = require('jsonwebtoken');
const queries = require('./queries');

// Read recipes
router.get('/', async (req, res, next) => {
    
    const user = jwt.decode(req.cookies.TOKEN);
    try {
    let result = await pool.query(queries.selectRecipes, [user.restaurant_id]);
    res.status(200).send(result);
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
        return next('Problems reading your recipes');
    }
})

// Read One Recipe
router.get('/complete/:id', async (req, res, next) => {
    
    try {
    let recipe = await pool.query(queries.selectOneRecipe, [req.params.id]);
    res.status(200).send(recipe[0]);
    } catch(err) {
        res.sendStatus(400);
        return next('Problems reading your recipes');
    }
})

module.exports = router;