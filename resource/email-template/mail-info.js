class MailInfo {
    #from;
    #to;
    #subject;
    #name;
    #date;
    #isHTML;

    constructor(from, to, subject, name, isHTML) {
        this.#from = from;
        this.#to = to;
        this.#subject = subject;
        this.#name = name;
        this.#date = new Date();
        this.#isHTML = isHTML;
    }

    getFrom() {
        return this.#from;
    }

    getTo() {
        return this.#to;
    }

    getSubject() {
        return this.#subject;
    }

    getName() {
        return this.#name;
    }

    getDate() {
        return this.#date;
    }

    isHTML() {
        return this.#isHTML;
    }

    printMailInfo() {
        console.log(`From: ${this.from}`);
        console.log(`To: ${this.to}`);
        console.log(`Subject: ${this.subject}`);
        console.log(`Name: ${this.name}`);
        console.log(`Date: ${this.date}`);
        console.log(`isHTML: ${this.isHTML}`);
    }
}

module.exports.MailInfo = MailInfo;


