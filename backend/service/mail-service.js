const nodemailer = require('nodemailer')

const user = 'prj666_201a05@myseneca.ca'

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: user,
        pass: 'BNjj6#4$pk2v'
    },
    secureConnection: false,
    tls: { ciphers: 'SSLv3' }
})

module.exports = {
    init: () => {
        transporter.verify((err, res) => {
            if (err) {
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
