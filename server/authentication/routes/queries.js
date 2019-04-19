const queries = {

    selectEmail: `
    SELECT users.email
    FROM users
    WHERE users.email = ?
    `,

    insertUser: `
    INSERT INTO users(email, name, password, role, restaurant_id)
    VALUES(?, ?, ?, ?, ?)
    `,

    selectUser: `
    SELECT *
    FROM users
    WHERE users.email = ?
    `,

    selectUserOnRefresh: `
    SELECT users.name, users.role, users.restaurant_id
    FROM sessions
        JOIN users
            ON sessions.user_id = users.user_id
    WHERE sessions.session_id = ?;
    `,

    insertSession: `
    INSERT INTO sessions(session_id, user_id)
    VALUES(?, ?)
    `,

    deleteSession: `
    DELETE FROM sessions
    WHERE sessions.session_id = ?
    `,

    updateSession: `
    UPDATE sessions
    SET session_id = ?
    WHERE session_id = ?
    `,

    insertRevoked: `
    INSERT INTO revoked_sessions(session_id)
    VALUES (?)
    `,

    insertRestaurant: `
    INSERT INTO restaurants
    VALUES (?, ?, ?, ?, ?)
    `,

    selectInvitation: `
    SELECT * FROM invitation_links
    WHERE invitation_id = ?
    `,

    D_invitation: `
    CALL D_invitations(?)
    `

}

module.exports = queries;