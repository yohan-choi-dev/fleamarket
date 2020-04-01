async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

exports.asyncForEach = asyncForEach

// another options to use async with synchronize collections
// in case you need to use map, reduce, filter 'for of',
// instead of inveting wheel, you can use aync library

// const async = require('async')
// async.each(array, callback, (err) => {
// })
// with es7 syntax

// async.each(array, async callback)

// or even you can try

// async = async.asyncify()
// async.each(array, callback)
