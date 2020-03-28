module.exports.json = {
    deserialize: (data) => JSON.parse(data),
    serialize: (data) => JSON.stringify(data, null, ' ')
}
