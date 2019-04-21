const queries = {
    // Query for products with their category
    selectOneProduct: `
    SELECT products.product_id, products.name, categories.name AS category, products.loss, products.price, products.cost
    FROM products
        JOIN categories
            ON products.category_id = categories.category_id
                WHERE products.restaurant_id = ? AND products.product_id = ?
    `,

    selectAllProducts: `
    SELECT products.product_id, products.name, categories.name AS category, products.loss, products.price, products.cost
    FROM products
        JOIN categories
            ON products.category_id = categories.category_id
                WHERE products.restaurant_id = ?
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
    `
    
}

module.exports = queries;