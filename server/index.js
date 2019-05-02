require('dotenv').config();
const express = require('express');
const app = express();
const exjwt = require('express-jwt');
const dependencies = require('./dependencies');
const api = require('./api/api');
const auth = require('../server/authentication/utils/auth');
const authentication = require('./authentication/module');

app.use(dependencies);

app.use(exjwt({
    secret: process.env.JWT_SECRET,
    // Take the cookie with the token from the request
    getToken: (req) => {
        const token = req.cookies.TOKEN;
        return token;
    }
}).unless({path: ['/login', '/refresh', '/signin', '/logout']}));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
      }
    next();
});

app.use((req, res, next) => {
    app.use('/api/', auth.revokedList(), api);
    next()
})


app.use(authentication);


app.listen(process.env.PORT, () => {
    console.log('Server up and listening ' + process.env.PORT)
})