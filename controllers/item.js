const Items = require('../models/items');

exports.getItems = async (req, res, next) => {
    let items = [];
    try  {
        items = await Items.findAll();
        if (items.length === 0) {
            const error = new Error('No available item');
            error.statusCode = 401;
            throw error;
        }
        res.status(200).send(JSON.stringify(items));
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        next();
    }
};

