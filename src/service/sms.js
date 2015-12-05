var AV = require('avoscloud-sdk');

function send(tel) {
    return AV.Cloud.requestSmsCode({
        mobilePhoneNumber: tel,
        name: '复旦二手工坊',
        op: '注册',
        ttl: 10
    });
}


module.exports = {
    send: send,
}
