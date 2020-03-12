const fs = require('fs');

exports = (res, path) => {
    const file = fs.createReadStream(path);
    res.setHeader('Content-Type', 'image');
    file.pipe(res);
}