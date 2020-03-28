module.exports = (fn) => {
    let done = false
    return (...args) => {
        if (!done) {
            done = true
            return fn(...args)
        }
    }
}
