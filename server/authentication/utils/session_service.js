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
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    // Generate random SESSION_ID
    return { token: token, id: session }
}