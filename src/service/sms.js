AV = require('avoscloud-sdk');
AV.Cloud.requestSmsCode({
    mobilePhoneNumber: '13316919664',
    name: 'FDSHM',
    op: '某种操作',
    ttl: 10
}).then(function(result) {
    //发送成功
    console.log(result);
}, function(err) {
    //发送失败
    console.log(err);
});