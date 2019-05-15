const nodemailer_connection = require('../../nodemailer_pool');

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
                <a href="https://foodcep.com/~/verify?code=${code}" target="_blank">
                    foodcep.com/~/verify?code=${code}
                </a>
                <p>Este link expirará en 15 minutos!</p>
                <br>
                <small>Este mensaje va dirigido exclusivamente a su destinatario, pudiendo contener información confidencial o privilegiada. Si el receptor no fuera el destinatario, rogamos nos lo comunique cuanto antes. No está permitido realizar copias parciales o totales de su contenido ni su divulgación a persona diferente de su destinatario.

                Los datos recogidos en esta ficha, serán incorporados a un fichero informático cuyo titular es Foodcep, siendo tratados con la debida confidencialidad y reserva apropiadas, conforme a la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal, para su exclusiva utilización con fines de gestión interna de la asociación.
                
                Usted podrá ejercer los derechos de acceso, rectificación y cancelación de sus datos, mediante la plataforma informatica ingresando con su cuenta en <a href="http://foodcep.com">Foodcep</a>.</small>
                `
            })
            resolve('Email sended');
        } catch(err) {
            reject('Problems sending the verification email');
        }

    })
}
