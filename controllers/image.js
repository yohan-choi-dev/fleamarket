const Item = require("../models/item");
const ImageLink = require("../models/image-link");
const sequelize = require("../utils/database");

exports.getImageById = async (req, res, next) => { };

exports.getImageByItemId = async (req, res, next) => {
    let itemId = req.query.itemId;
    let search_query = `SELECT * FROM ImageLinks
                        WHERE itemId=${itemId};`;
    try {
        let results = await sequelize.query(search_query, {
            type: sequelize.QueryTypes.SELECT
        });
        if (results.length === 0) {
            const error = new Error("No Search Result");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).send(JSON.stringify(results));
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);

    };
}

exports.postImage = async (req, res, next) => {
    const image = req.file;
    try {
        if (!image) {
            const err = new Error("No image file");
            err.statusCode = 422;
            throw err;
        }
        const imageUrl = req.body.imageLink;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
