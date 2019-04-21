const router = require('express').Router();
const pool = require('../../../../db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

// 
router.patch('/:id', async (req, res, next) => {

    const dish_id = req.params.id;
    try {
        const patch = await patchHandler(req.body, dish_id);
        // Response with the updated dish
        res.redirect(`/api/dishes/read/${req.params.id}`)
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
        return next(`Problems patching the dish`);
    }
    
})

// Handles each operation included on the patch
const patchHandler = (jsonPatch, dish_id) => {
    return new Promise ((resolve, reject) => {
        jsonPatch.forEach(async (patch) => {
            const field = path(patch.path);
            try {
                switch (patch.op) {
                    case 'add':
                    // This one will trigger just for ingredients entity
                    const add = await pool.query(queries.addPatch, [field[1], dish_id, patch.value]);
                    resolve('Patch successfully made');
                    break;
                    case 'remove':
                    // This one will trigger just for ingredients entity
                    const remove = await pool.query(queries.removePatch, [field[1], dish_id]);
                    resolve('Patch successfully made');
                    break;
                    case 'replace':
                    console.log(field);
                        // If the field y smaller than 2 we are patching the dish entity 
                        if (field.length < 2) {
                            const replace = await pool.query(queries.replaceDishPatch(field[0]), [patch.value, dish_id]);
                            resolve('Patch successfully made');
                        } else {
                            const replace = await pool.query(queries.replaceIngredientPatch, [patch.value, field[1], dish_id]);
                            resolve('Patch successfully made');
                        }
                    break;
                }
            } catch(err) {
                console.log(err);
                reject('Problems doing the patches');
            }
        })
    })
}

// Deals with each patch path
const path = (path) => {
    /*
        Posible path structures: 
        /[property]
        /products/[products.product_id]
        /ingredients/[ingredients.ingredient_id]

        Patches on ingredients entity on replace/remove:
        INPUT => /ingredients/[ingredients.ingredient_id]
        OUTPUT => ['ingredients', 'ingredients.ingredient_id']
        e.g : /ingredients/2 => ['ingredients', 2]

        Patches on ingredients entity on add:
        INPUT => /products/[products.product_id]
        OUTPUT => ['products', 'product.product_id']
        e.g: /product/5 => ['products', 5];

        Patches on dish entity on replace:
        INPUT => /[property]
        OUTPUT => ['property']
        eg: /cost => ['cost']
    */
    return path.slice(1).split('/');
}

module.exports = router;