const Category = require('../models/category')

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            attributes: ['category']
        })
        res.status(201).json(categories)
        res.status(201).send(JSON.stringify(categories))
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
