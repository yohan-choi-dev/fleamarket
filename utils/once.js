// This wrapper function garuantee the wrapper function will be ran only once.
module.exports = (fn) => {
    let done = false
    return (...args) => {
        if (!done) {
            done = true
            return fn(...args)
        }
    }
}
