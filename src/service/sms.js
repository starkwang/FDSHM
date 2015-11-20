AV = require('avoscloud-sdk');

function send(tel) {
    return AV.Cloud.requestSmsCode({
        mobilePhoneNumber: tel,
        name: '复旦二手工坊',
        op: '注册',
        ttl: 10
    });
}

function vertify(tel, captcha) {
    var user = new AV.User();
    return user.signUpOrlogInWithMobilePhone({
        mobilePhoneNumber: tel,
        smsCode: captcha,
    });
}


module.exports = {
    send: send,
    vertify: vertify
}
