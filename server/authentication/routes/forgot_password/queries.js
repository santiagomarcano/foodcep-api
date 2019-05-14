var crypto = require("crypto");

const queries = {

    updatePassword: `
    UPDATE users 
        SET password = ?
            WHERE user_id = ?;
    `,

    // Stored procedures
    S_user_I_forgot_code: `
    CALL S_user_I_forgot_code(?, ?);
    `,

    selectUser: `
    SELECT user_id 
        FROM users
            WHERE email = ?;
    `,

    insertCode: `
    INSERT INTO forgots(user_id, code)
        VALUES (?, ?);
    `,

    DS_forgot_code: `
    CALL DS_forgot_code (?);
    `,

      // Events 
      EVENT() {
        // Generate random name to the event
        let event = crypto.randomBytes(20).toString('hex');
        return `
        CREATE EVENT ${event}
            ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 15 MINUTE
                DO 
                    DELETE FROM forgots
                        WHERE code = ?;
        `
    }

}

module.exports = queries;