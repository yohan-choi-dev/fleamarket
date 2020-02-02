const nodemailer = require('nodemailer');


module.exports = async () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
            user: "prj666_201a05@myseneca.ca",
            pass: "BNjj6#4$pk2v"
        },
        secureConnection: false,
        tls: {ciphers: 'SSLv3'}
    });

    transporter.verify((err, suc) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Success to connect to the mail server');
        }
    })

    const message = {
        from: "prj666_201a05@myseneca.ca",
        to: "ychoi63@myseneca.ca",
        subject: "Test Email",
        text: "Plain text",
        html: "<p>Hello </p>"
    }

    let info = await transporter.sendMail(message);
    console.log(info.messageId);

}

