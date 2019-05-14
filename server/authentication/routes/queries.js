var crypto = require("crypto");

const queries = {

    selectVerification: 
    `SELECT user_id
        FROM verifications
            WHERE code = ?;
    `,

    verifyUser: `
    UPDATE users
        SET verification = true
            WHERE user_id = ?;
    `,

    selectEmail: `
    SELECT users.email
    FROM users
    WHERE users.email = ?;
    `,

    selectEmailWithID: `
    SELECT email
    FROM users
    WHERE user_id = ?;
    `,

    deleteVerificationCode: `
    DELETE FROM verifications
        WHERE user_id = ?;
    `,

    selectUser: `
    SELECT *
    FROM users
    WHERE users.email = ?;
    `,

    selectUserOnRefresh: `
    SELECT users.name, users.role, users.restaurant_id, users.user_id
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
    VALUES (?);
    `,

    selectRevoked: `
    SELECT * FROM revoked_sessions
        WHERE session_id = ?
    `,

    insertRestaurant: `
    INSERT INTO restaurants
    VALUES (?, ?, ?, ?, ?)
    `,

    selectInvitation: `
    SELECT * FROM invitation_links
    WHERE invitation_id = ?
    `,

    selectSession: `
    SELECT session_id 
        FROM sessions
            WHERE user_id = ?
    `,

    insertVerificationCode: `
    INSERT INTO verifications (code, user_id)
        VALUES (?, ?)
    `,
    // Stored Producedures

    D_invitation: `
    CALL D_invitations(?)
    `,

    IS_user: `
    CALL IS_user (?, ?, ?, ?, ?, ?, ?);
    `,

    // Events 
    EVENT() {
        // Generate random name to the event
        let event = crypto.randomBytes(20).toString('hex');
        return `
        CREATE EVENT ${event}
            ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 15 MINUTE
                DO 
                    DELETE FROM verifications
                        WHERE code = ?;
        `
    }

}

module.exports = queries;