module.exports = (profile, fn) => {
    process.stdin.on('data', (input) => {
        fn({ message: input, from: profile.from.id, to: profile.to.id })
    })
}
