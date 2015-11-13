var nodemailer = require('nodemailer');
var user = '14300690092@fudan.edu.cn',
    pass = '**';

var mail = {
    send : function(target, title, content) {
        var smtpTransport = nodemailer.createTransport({
            host: "mail.fudan.edu.cn",
            auth: {
                user: user,
                pass: pass
            }
        });
        var targetMail = '<' + target + '>';
        smtpTransport.sendMail({
            from: '**<' + user + '>',
            to: targetMail,
            subject: title,
            html: content
        }, function(error, result) {
            console.log(error, result);
        });
    },
}
module.exports = mail;