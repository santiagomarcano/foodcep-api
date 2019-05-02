queries = {

    insertRestaurant: `
    INSERT INTO restaurants
    VALUES (?, ?, ?, ?, ?)
    `,

    selectRestaurant: `
    SELECT name AS restaurant_name, phone, adress, description
        FROM restaurants
            WHERE restaurant_id = ?
    `,

    US_restaurant: `
    CALL US_restaurant(?, ?, ?, ?, ?)
    `

}

module.exports = queries;

