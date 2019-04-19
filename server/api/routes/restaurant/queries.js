queries = {

    insertRestaurant: `
    INSERT INTO restaurants
    VALUES (?, ?, ?, ?, ?)
    `,

    updateUser: `
    UPDATE users
    SET restaurant_id = ?, role = 'chef'
    WHERE user_id = ?
    `,

    US_restaurant: `
    CALL US_restaurant(?, ?, ?, ?, ?)
    `

}

module.exports = queries;

