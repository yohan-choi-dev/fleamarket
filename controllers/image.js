const Item = require("../models/item");
const ImageLink = require("../models/image-link");

exports.getImageById = async (req, res, next) => {};

exports.getImageByItemId = async (req, res, next) => {};

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
