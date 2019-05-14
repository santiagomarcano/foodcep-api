const queries = {
    selectRecipes: `
    SELECT dishes.name AS name, recipes.recipe_id, recipes.dish_id, recipes.recipe, recipes.minimum_production
        FROM recipes
                JOIN dishes
                    ON recipes.dish_id = dishes.dish_id
                        WHERE recipes.restaurant_id = ?;
    `,

    selectOneRecipe: `
    SELECT dishes.name AS name, recipes.recipe_id, recipes.dish_id, recipes.recipe, recipes.minimum_production
        FROM recipes
                JOIN dishes
                    ON recipes.dish_id = dishes.dish_id
                        WHERE recipe_id = ?;
    `,

    // Stored Procedures

    IS_recipe: `
    CALL IS_recipe(?, ?, ?, ?);
    `,

    US_recipe: `
    CALL US_recipe(?, ?, ?);
    `,

    deleteRecipe: `
    DELETE FROM recipes
        WHERE recipe_id = ?;
    `


}

module.exports = queries;