require('dotenv').config();
const express = require('express');
const fs = require('fs');
const app = express();
const exjwt = require('express-jwt');
const dependencies = require('./dependencies');
const api = require('./api/api');
const auth = require('../server/authentication/utils/auth');
const authentication = require('./authentication/module');
const jwt = require('jsonwebtoken');
const cookieService = require('./authentication/routes/login/login_cookies');
const pub_key = fs.readFileSync('server/rsa-keys/token_key.pub', 'utf8')

app.use(dependencies);

app.use(exjwt({
    secret: pub_key,
    // Take the cookie with the token from the request
    getToken: (req) => {
        const token = req.cookies.TOKEN;
        return token;
    }
}).unless({
    path: [
    '/login',
    '/refresh',
    '/signin/restaurant',
    '/signin/',
    '/logout',
    '/currencies',
    '/captcha/verify',
    /^\/verify/,
    '/verify/resend/',
    /^\/forgot/,
    /^\/forgot\/update/
    ]})
);

app.use(async function (err, req, res, next) {
    if (err.name === 'UnauthorizedError' || err.name === 'TokenExpiredError') {
        res.sendStatus(401);
    } 
});

app.use((req, res, next) => {
    if (req.cookies.TOKEN) {
        app.use('/api/', auth.revokedList(), api);
        jwt.verify(req.cookies.TOKEN, pub_key, { algorithms: ['RS256'] }, (err, decode) => {   
            if (decode) {
                // In case some funny person tries to change its cookie role
                if (req.cookies.ROLE !== decode.role && req.originalUrl !== '/logout') {
                    res.sendStatus(403);
                } else {
                    res = cookieService.refreshCookies(res, req.cookies);
                    next();
                }
            } 
            if (err) next()
        })
    } else {
        next();
    }
})

app.use(authentication);


app.listen(process.env.PORT, () => {
    console.log('Server up and listening ' + process.env.PORT)
})