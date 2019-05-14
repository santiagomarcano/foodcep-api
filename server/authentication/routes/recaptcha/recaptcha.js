const express = require('express');
const router = express.Router();
const request = require('request');


// Login
router.post('/verify', async (req, res, next) => {

    const { token, redirection } = req.body;

    if (token === undefined || token === '' || token === null) {
        res.status(403).send({ "success": false, "msg": "Captcha failed" });
    }

    const secretKey = '6LdjYaMUAAAAAG5QX6iaMKEUrFVm9eAHkO6EE5IJ';
    const verifyUrl = `
    https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}
    `
 
    // Request to verify the URL
    request.post(verifyUrl, (err, response, body) => {
        // body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            res.status(403).send({ "success": false, "msg": "Captcha failed" });
        }

        // Successfull 
        if (redirection !== undefined) {
            res.redirect(redirection);
        } else {
            res.status(200).send({ "success": true, "msg": "Captcha success" })
        }
        
    })
    
})

module.exports = router;