const queries = {
    // Query for products with their category
    selectOneProduct: `
    SELECT products.product_id, products.name, categories.name AS category, products.loss, products.price, products.cost
    FROM products
        JOIN categories
            ON products.category_id = categories.category_id
                WHERE products.restaurant_id = ? AND products.product_id = ?
    `,

    selectProductsWithQuery: `
    SELECT products.product_id, products.name, categories.name AS category, products.loss, products.price, products.cost
    FROM products
        JOIN categories
            ON products.category_id = categories.category_id
                WHERE products.restaurant_id = ? AND products.name LIKE ?
                    ORDER BY products.name ASC
                        LIMIT ?, 5;
                  
    `,

    rowsCount: `
    SELECT COUNT(*) as count
        FROM products
         WHERE restaurant_id = ?
    `,

    selectCategory: `
    SELECT category_id
        FROM categories
            WHERE name = ? AND restaurant_id = ?;
    `,

    selectDishesToUpdate: `
    SELECT ingredients.dish_id
    FROM ingredients
        JOIN dishes ON ingredients.dish_id = dishes.dish_id
            WHERE ingredients.product_id = ? AND dishes.restaurant_id = ?;
    `,

    // Stored Procedures

    IS_product: `
    CALL IS_product(?, ?, ?, ?, ?, ?);
    `,

    DS_product: `
    CALL DS_product(?);
    `,

    US_product: `
    CALL US_product(?, ?, ?, ?, ?, ?, ?);
    `,

    DS_product: `
    CALL DS_product(?, ?);
    `,

    U_dish_cost: `
    CALL U_dish_cost(?, ?, ?);
    `
    
}

module.exports = queries;