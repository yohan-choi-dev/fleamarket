class MailResource {
    constructor(url, desc) {
        this.resource = {
            url: url,
            desc: desc
        };
        Object.freeze(this.resource);
    }
}

module.exports.MailResource = MailResource;
