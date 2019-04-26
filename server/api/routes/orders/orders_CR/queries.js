const queries = {

    INSERT_ORDER_ITEMS(items, order_id){
        const VALUES = items.map((item) => {
            return (`(${item.product_id}, ${item.quantity}, '${item.unit}', ${order_id})`)
        })
        return `
            INSERT INTO order_items (product_id, quantity, unit, order_id)
                VALUES ${VALUES.join(',')};
        `
    },

    selectItems: `
        SELECT products.product_id, products.name, order_items.quantity, order_items.unit
            FROM order_items
                JOIN products ON order_items.product_id = products.product_id
                        WHERE order_items.order_id = ?;  
    `,

    // Stored Procedures

    IS_order: `
    CALL IS_order(?, ?, ?);
    `,

    S_1_order: `
    CALL S_1_order(?, ?);
    `,

    S_20_order: `
    CALL S_20_order(?);
    `

}

module.exports = queries;