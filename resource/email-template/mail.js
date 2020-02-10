'use strict';
const { Content } = require('./content');
const { MailInfo } = require('./mail-info');
const { MailResource } = require('./mail-resource');
const { DOCTYPE, HTML, HEAD, META, BODY, H2, H3, A, P } = require('./html-tag');

class Mail {
    #content;
    #info;
    #resource;
    #element;

    constructor(info, mailResource) {
        this.#content = new Content();
        if (info instanceof MailInfo) {
            this.#info = info
        }
        if (mailResource instanceof MailResource) {

            console.log(mailResource);
            this.#resource = mailResource.resource;
        }
        this.#element = {

        }
        this.releaseMail();
    }

    setGreeting() {
        const name = this.#info.getName();
        let welcome1 = `Welcome, ${name}!`
        let welcome2 = `Thank you for joining Fleamarket.`

        welcome1 = H2(welcome1);
        welcome2 = H2(welcome2);
        return welcome1 + welcome2;
    }

    setBody() {
        let body1 = `To verify your account, please click the following link `;
        let body2 = `If you don't click the link withing 24 hours, this link will be expired automatically`;
        body1 = P(body1);
        body2 = P(body2);
        return body1 + body2;
    }

    setURL() {
        return A(this.#resource.url, this.#resource.desc);
    }

    releaseMail() {
        this.#content.pushFront(this.setGreeting(),true);
        this.#content.pushBack(this.setBody(),true);
        this.#content.pushBack(this.setURL(),true);
        this.#content.text = BODY(this.#content.text,true);
        this.#content.pushFront(HEAD(META()),true);
        this.#content.text = HTML(this.#content.text);
        this.#content.pushFront(DOCTYPE(),true);
    }

    getContent() {
        return this.#content;
    }

    print() {
        this.#content.printContent();
    }
};

module.exports.Mail = Mail;


