const Items = require('../models/items');

exports.getItems = (req, res, next) => {
    res.json()
    Items.find()
        .then(items => {
            console.log(items);
        })
        .catch(err => {
            console.log(err);
        });
};

