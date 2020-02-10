const fs = require('fs');
const path = require('path');

const DIR = './emails'

class Content {
    constructor() {
        this.text = '';
        this.indent = this.setIndent('<br>') || '<br>';
    }

    setIndent(indent) {
        if (indent) {
            this.indent = indent;
        }
    }

    pushFront(str, option) {
        let indent = option ? this.indent : ' ';
        this.text = str.concat(`${indent}${this.text}`);
    }

    pushBack(str, option) {
        let indent = option ? this.indent : ' ';
        this.text = this.text.concat(`${indent}${str}`);
    }

    getContent() {
        return this.text;
    }

    getIndent()
    {
        return this.indent;
    }

    getFileName(name) {
        const now = new Date();
        const year = now.getFullYear();
        const mon = now.getMonth();
        const day = now.getDate();
        const hour = now.getHours();
        const min = now.getMinutes();
        const sec = now.getSeconds();
        const rand = Math.round(Math.random() * 100);
        let fileName = `${name || 'mail'}-${year}${mon}${day}${hour}${min}${sec}${rand}.html`
        fileName = fileName.replace(/\ /g, '');
        return fileName;
    }

    printContent(mailName) {
        try {
            const fileName = this.getFileName(mailName);
            fs.writeFile(path.join(__dirname, DIR ,fileName), this.text, (err) => {
                if (err) throw err;
                else {
                    console.log(`Successfully printed an email as ${fileName}`);
                }
            });
        } catch (err) {
            console.log(err);
        }
        console.log(this.text);
    }
}

module.exports.Content = Content;
