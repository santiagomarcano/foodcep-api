const fs = require('fs');
const private_key = fs.readFileSync('server/rsa-keys/token_key', 'utf8')
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

exports.generateSession = (credentials) => {
    // Sign JWT with user no-sensitive data as payload
    const session = uuidv4();
    const payload = {
        user_id: credentials.user_id,
        name: credentials.name,
        role: credentials.role,
        restaurant_id: credentials.restaurant_id
    }
    const token = jwt.sign(payload, private_key, {
        algorithm: 'RS256',
        expiresIn: '30m'
    })
    // Generate random SESSION_ID
    return { token: token, id: session }
}