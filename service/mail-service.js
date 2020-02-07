const nodemailer = require('nodemailer');

const user = "prj666_201a05@myseneca.ca";

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: user,
        pass: "BNjj6#4$pk2v"
    },
    secureConnection: false,
    tls: {ciphers: 'SSLv3'}
});


let info = await transporter.sendMail(message);
console.log(info.messageId);

module.exports = {
    init: async () => {
        transporter.verify((err, suc) => {
            if (err) {
                throw new Error('Failed to connected to the mail server');
            }
            console.log('Success to connnecting the mail server!');
        })
    },
    sendMail: async (to, msg) => {
        let message = {
            from: user,
            to: to,
            subject: msg.subject,
            text: msg.text, // this is only for clients with plain text support only
            html: msg.html
        }
        transporter.sendMail(message);
    }
}

