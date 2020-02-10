const { Mail } = require('./mail');

class VerificationMail extends Mail {
    constructor(obj) {
        super(obj);
    }
    setTitle(template) {
        return `${('Welcome to join Fleamarket!')}`
    }

    getMail() {
        return this;
    }

    printMail() {
        super.printMail();
        console.log(this.body);
    }

}

module.exports.VerificationMail = VerificationMail;


let content = {
    to: 'yohan.choi@naver.com',
    from: 'prj666_201a05@myseneca.ca',
    subject: 'Fleamarket ID Email Verification',
    name: 'Yohan Choi'
}
let mymail = new VerificationMail(content);

mymail.printMail();
