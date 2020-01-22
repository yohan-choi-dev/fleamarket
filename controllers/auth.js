const connection = require('../model/data-service.auth.js');

exports.getLogin = (req, res, next) => {
    res.send('');
};


exports.postLogin = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        // this part will be filled later
        connection.query('');

    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
    res.redirect('/');
}
