const queries = {

    selectAllCategories: `
    SELECT * FROM categories
    WHERE restaurant_id = ?;
    `,

    IS_category: `
    CALL IS_category(?, ?);
    `,

    US_category: `
    CALL US_category(?, ?, ?);
    `,

    DS_category: `
    CALL DS_category(?, ?);
    `,

}

module.exports = queries;