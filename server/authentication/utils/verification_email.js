const nodemailer_connection = require('../../nodemailer_pool');
const hbs = require('nodemailer-express-handlebars');

exports.sendEmail = (email, code) => {
    return new Promise(async (resolve, reject) => {

        try {
            const send = nodemailer_connection.sendMail({
                from: '"Foodcep" <hello@foodcep.com>',
                to: email,
                subject: "no-reply. Verifique su cuenta en Foodcep!",
                html: 
                `<h1>Bienvenido a Foodcep!</h1>
                <br>
                <p>Es necesaria la verificación de su email para poder utilizar Foodcep</p>
                <p>Visite el siguiente link para verificar su email y empiece a utilizar su cuenta en Foodcep</p>
                <a href="http://localhost:8080/verify?code=${code}" target="_blank">
                    localhost:8080/verify?code=${code}
                </a>
                <p>Este link expirará en 2 horas!</p>
                `
            })
            resolve('Email sended');
        } catch(err) {
            reject('Problems sending the verification email');
        }

    })
}