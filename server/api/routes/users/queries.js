var crypto = require("crypto");

const queries = {

    selectUserBasedOnSessionID: `
    SELECT sessions.user_id, users.email, users.name, users.language, users.restaurant_id
    FROM sessions
        JOIN users
            ON sessions.user_id = users.user_id
    WHERE sessions.session_id = ?;
    `,

    selectUser: `
    SELECT restaurant_id
    FROM users
    WHERE user_id = ?
    `,

    updatePassword: `
    UPDATE users
    SET users.password = ?
    WHERE users.email = ?;
    `,

    deleteUserWithEmail: `
    DELETE FROM users
    WHERE email = ?;
    `,

    selectAllProfiles: `
    SELECT user_id, email, name, role
    FROM users
    WHERE restaurant_id = ?
    `,

    // Stored Procedures

    I_invitation: `
    CALL I_invitations(?, ?, ?)
    `,

    US_user_email: `
    CALL US_user_email(?, ?);
    `,

    US_user_name: `
    CALL US_user_name(?, ?);
    `,

    US_user_language: `
    CALL US_user_language(?, ?);
    `,

    D_user: `
    CALL D_user(?, ?);
    `,

    // Events 

    EVENT() {
        // Generate random name to the event
        let event = crypto.randomBytes(20).toString('hex');
        return `
        CREATE EVENT ${event}
            ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 MINUTE
                DO CALL D_invitations(?);
        `
    }
 
}

module.exports = queries;