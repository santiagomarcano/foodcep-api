const queries = require('../routes/queries');
const pool = require('../../db');
const password_management = require('./password_management');

// Checks for authenticity of credentials
exports.authenticate = (email, password) => {
    return new Promise (async (resolve, reject) => {
        try {
            const result = await pool.query(queries.selectUser, [email]);
            const validate = await password_management.compare_password(password, result[0].password);
            return resolve(result[0]);
        } catch(err) {
            reject('Invalid credentials');;
        }
    })
}

// Validates if an email is already in use
exports.validateEmail = (email) => {
    return new Promise (async (resolve, reject) => {
        
            try {
            const result = await pool.query(queries.selectEmail, [email]);
                if (result.length > 0) {
                    return reject('Invalid');
                } else {
                    next(err);
                }        
            } catch(err) {
                return resolve('Valid');
            }
    })
}

// Store sessions on DB
exports.storeSession = (session_id, user_id) => {
    return new Promise (async (resolve, reject) => {
        try {
            const result = await pool.query(queries.insertSession, [session_id, user_id]);
            return resolve(result);
        } catch(err) {
            console.log(err);
            return reject('Problem while storing session');
        }
    })
}

exports.revokedList = () => {
    return async (req, res, next) => {
        try {
            const result = await pool.query(queries.selectRevoked, [req.cookies.SESSION_ID])
            if (result.length > 0) {
                res.sendStatus(403)
            } else {
                console.log('Authorized')
                next()
            }
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }

    }
}