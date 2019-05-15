const nodemailer_connection = require('../../../nodemailer_pool');

exports.sendEmail = (email, code) => {
    return new Promise(async (resolve, reject) => {

        try {
            const send = nodemailer_connection.sendMail({
                from: '"Foodcep" <hello@foodcep.com>',
                to: email,
                subject: "no-reply. Cambie su contraseña en Foodcep",
                html: 
                `<h1>Hola!</h1>
                <br>
                <p>Recibes este mensaje ya que has olvidado tu contraseña y necesitas recuperarla</p>
                <p>Visite el siguiente link para modificar su contraseña</p>
                <a href="https://foodcep.com/land/login/change?code=${code}" target="_blank">
                    https://foodcep.com/land/login/change?code=${code}
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