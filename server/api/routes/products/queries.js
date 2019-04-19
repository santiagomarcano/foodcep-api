const queries = {
    // Query for products with their category
    selectProducts: `
    SELECT products.product_id, products.name, categories.name AS category, products.loss, products.price, products.cost
    FROM products
        JOIN categories
            ON products.category_id = categories.category_id
                WHERE products.restaurant_id = ?
    `,
    
}

module.exports = queries;