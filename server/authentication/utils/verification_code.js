const pool = require('../../db');
const uuidv4 = require('uuid/v4');
const queries = require('../routes/queries');
const verification_email = require('./verification_email');

exports.createVerificationCode = (user_id, email) => {
    return new Promise (async (resolve, reject) => {
        const code = uuidv4();
        try {
            // Delete previous code if there's any
            const deletePrevious = await pool.query(queries.deleteVerificationCode, [user_id])
            // Registre the code on DB
            const codeCreation = await pool.query(queries.insertVerificationCode, [code, user_id]);
            // Creates an event to erase the code on 2h
            const event = await pool.query(queries.EVENT(), [code]);
            const sendEmail = await verification_email.sendEmail(email, code);
            resolve('Verification created');
        } catch(err) {
            console.log(err)
            reject('Problems creating the verification code');
        }
    })
}
