var cookie = require('cookie');

function getGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

function parseCookie(cookieStr) {
    return cookie.parse(cookieStr);
};

module.exports = {
    getGuid: getGuid,
    parseCookie: parseCookie
};