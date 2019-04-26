const queries = {

    selectAllSuppliers: `
    SELECT supplier_id, name, email, phone, comertial
        FROM suppliers
            WHERE restaurant_id = ?;
    `,

    selectOneSupplier: `
    SELECT supplier_id, name, email, phone, comertial
        FROM suppliers
            WHERE supplier_id = ? AND restaurant_id = ?;
    `,

    // Stored Procedures
    IS_supplier: `
    CALL IS_supplier(?, ?, ?, ?, ?);
    `,

    US_supplier: `
    CALL US_supplier(?, ?, ?, ?, ?, ?);
    `,

    DS_supplier: `
    CALL DS_supplier(?, ?);
    `

}

module.exports = queries;