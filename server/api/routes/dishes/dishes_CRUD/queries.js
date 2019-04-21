const queries = {

    // Events 

    INSERT_INGREDIENTS(ingredients, dish_id) {
        // Query string based on the number of items to insert
        const VALUES = ingredients.map((item) => {
            return (`(${item.product_id}, ${dish_id}, ${item.gPP})`);
        })
        return `
        INSERT INTO ingredients (product_id, dish_id, gPP)
        VALUES ${VALUES};
        `
    },

    selectDishes: `
    SELECT dish_id, name, category, cost
        FROM dishes
            WHERE restaurant_id = ?;
    `,

    selectDish: `
    SELECT dish_id, name, category, cost
        FROM dishes
            WHERE dish_id = ? AND restaurant_id = ?;
    `,
    
    selectIngredients: `
    SELECT ingredients.ingredient_id, products.name, ingredients.gPP, products.cost
        FROM ingredients
            JOIN products
                ON ingredients.product_id = products.product_id
                    WHERE ingredients.dish_id = ?;
    `, 

    addPatch: `
        INSERT INTO ingredients (product_id, dish_id, gPP)
            VALUES (?, ?, ?);
    `,

    removePatch: `
        DELETE FROM ingredients
            WHERE ingredient_id = ? AND dish_id = ?;
    `,

    replaceIngredientPatch: `
        UPDATE ingredients
            SET gPP = ?
                WHERE ingredient_id = ? AND dish_id = ?
    `,

    // Stored Procedures

    IS_dish: `
    CALL IS_dish(?, ?, ?, ?);
    `,

    US_dish: `
    CALL US_dish(?, ?, ?, ?, ?);
    `,

    DS_dish: `
    CALL DS_dish(?, ?);
    `,

    US_ingredient: `
    CALL US_ingredient(?, ?, ?);
    `,

    DS_ingredient: `
    CALL DS_ingredient(?, ?);
    `,
 
}

module.exports = queries;