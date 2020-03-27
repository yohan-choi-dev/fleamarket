const path = require('path')
const multer = require('multer')
const cryptoRandomString = require('crypto-random-string')

const fileTypeFilter = (req, file, cb) => {
    if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log('images created')
        cb(
            null,
            cryptoRandomString({ length: 20, type: 'url-safe' }) + path.extname(file.originalname)
        )
    }
})

// Allow the user to upload multiple images for an item,
// up to 8 images, 5MB max each.
exports.storageMiddleware = multer({
    storage: fileStorage,
    fileFilter: fileTypeFilter,
    limits: {
        fileSize: 1024 * 1024 * 1024 * 5
    }
}).array('image', 8)
