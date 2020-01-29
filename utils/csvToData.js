const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('../data.csv');
    .piple(csv())
    .on('data', (row))
