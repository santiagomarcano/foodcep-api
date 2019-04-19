const bcrypt = require('bcrypt');

exports.gen_password = (password) => {
    return new Promise ((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {

            if (err) return reject(err);

            bcrypt.hash(password, salt, (err, hash) => {

                if (err) return reject(err);

                return resolve(hash);
            })
        })
        
    })
}

exports.compare_password = (password, userPassword) => {
    return new Promise (async (resolve, reject) => {
        try {
            bcrypt.compare(password, userPassword, (err, isMatch) => {
                if (err) {
                    throw err
                }

                if (isMatch) {
                    return resolve('Valid Credentials');
                } else {
                    // Wrong password
                    return reject('Invalid Credentials');
                }
            })
        } catch(err) {
            // Wrong email
            return reject('Invalid Credentials');
        }
    })
}