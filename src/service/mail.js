var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var service = require('./service');
var user = '13307130321@fudan.edu.cn',
    pass = '310618';

var mail = {
    send: function(target, title, content) {
        return new Promise(function(resolve, reject) {
            var smtpTransport = nodemailer.createTransport({
                host: "mail.fudan.edu.cn",
                auth: {
                    user: user,
                    pass: pass
                }
            });
            var targetMail = '<' + target + '>';
            smtpTransport.sendMail({
                from: '复旦二手工坊<' + user + '>',
                to: targetMail,
                subject: title,
                html: content
            }, function(error, result) {
                if (error) {
                    reject(error);
                }
                if (result) {
                    resolve(result);
                }
            });
        })
    },
}
module.exports = mail;
