var AV = require('avoscloud-sdk');

function send(tel) {
    var query = new AV.Query(AV.User);
    query.equalTo("username", tel.toString());
    return query.find().then(function(result) {
        if (result.length > 0) {
            return false;
        } else {
            return true;
        }
    }).then(function(noConflict) {
        if (noConflict) {
            return AV.Cloud.requestSmsCode({
                mobilePhoneNumber: tel,
                name: '复旦二手工坊',
                op: '注册',
                ttl: 10
            });
        } else {
            return false;
        }
    })
}


module.exports = {
    send: send,
}
