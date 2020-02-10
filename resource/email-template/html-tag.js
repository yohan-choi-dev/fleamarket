const HTML_TAGS = Object.freeze({
    DOCTYPE: () => {
        return '<!DOCTYPE>';
    },
    HTML: (text) => {
        return `<html>${text}</html>`;
    },
    HEAD: (text) => {
        return `<head>${text}</head>`;
    },
    META: (text) => {
        let str = text || ' ';
        return `<meta>${str}</meta>`;
    },
    BODY: (text) => {
        return `<body>${text}</body>`;
    },
    HEADER: (text) => {
        return `<header>${text}</header>`;
    },
    MAIN: (text) => {
        return `<main>${text}</main>`
    },
    FOOTER: (text) => {
        return `<footer>${text}</footer>`;
    },
    NAV: (text) => {
        return `<nav>${text}</nav>`;
    },
    ARITICLE: (text) => {
        return `<ariticle>${text}</article>`;
    },
    ASIDE: (text) => {
        return `<aside>${text}</aside>`;
    },
    STYLE: (option) => {
        return `<style>${option}</style>`;
    },
    DIV: (text) => {
        return `<div>${text}</div>`;
    },
    SPAN: (text, style) => {
        return `<span style='${style}'>${text}</span>`;
    },
    H1: (text) => {
        return `<h1> ${text} </h1>`;
    },
    H2: (text) => {
        return `<h2> ${text} </h2>`;
    },
    H3: (text) => {
        return `<h3> ${text} </h3>`;
    },
    P: (text) => {
        return `<p> ${text} </p>`;
    },
    A: (url, text) => {
        return `<a href='${url}'>${text}</a>`;
    },
    HR: () => {
        return `<hr>`;
    },
    BR: () => {
        return `<br>`;
    }
});

module.exports = HTML_TAGS;
