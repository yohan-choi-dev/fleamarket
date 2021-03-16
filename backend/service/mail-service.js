const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const host = process.env.MAIL_HOST
const user = process.env.MAIL_USER
const password = process.env.MAIL_PASSWORD

const transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    auth: {
        user: user,
        pass: password
    },
    secureConnection: false,
    tls: { ciphers: 'SSLv3' }
})

module.exports = {
    init: () => {
        transporter.verify((err, res) => {
            if (err) {
                console.log('error', err);
                throw new Error(`Failed to connect the mail server ${err}`)
            }
            console.log(`Success to connect to mail server ${res}`)
        })
    },
    sendMail: async (to, msg) => {
        let message = {
            from: user,
            to: to,
            subject: msg.subject,
            text: msg.text,
            html: msg.html
        }
        console.log(msg);
        try {
            let result = await transporter.sendMail(message)
            if (result) {
                console.log(result)
            }
        } catch (err) {
            console.log(err)
        }
    }
}
