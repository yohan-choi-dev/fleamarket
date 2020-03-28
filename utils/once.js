module.exports = (fn) => {
    let done = false
    let count = 0
    console.log(count)
    console.log(done)
    return (...args) => {
        count++
        console.log(count)
        if (!done) {
            done = true
            return fn(...args)
        }
    }
}
