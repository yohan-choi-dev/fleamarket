const nodemailer = require("nodemailer");

const user = "prj666_201a05@myseneca.ca";

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: user,
        pass: "BNjj6#4$pk2v"
    },
    secureConnection: false,
    tls: { ciphers: "SSLv3" }
});

module.exports = {
    init: async () => {
        transporter.verify((err, suc) => {
            if (err) {
                throw new Error(`failed to connect the mail server ${err}`);
            }
            console.log("Success to connnecting the mail server!");
        });
    },
    sendMail: async (to, msg) => {
        let message = {
            from: user,
            to: to,
            subject: msg.subject,
            text: msg.text,
            html: msg.html
        };

        try {
            let result = await transporter.sendMail(message);
            if (result) {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }
};
