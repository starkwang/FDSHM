var service = require('../service/service');
var moment = require('moment');

function sendErr(res, message) {
    res.send({
        success: false,
        message: message
    });
}

var user = {
    requestTelVerify: function(req, res) {
        console.log('[ API : user.telVerify ] ' + JSON.stringify(req.body));
        if (req.body.tel) {
            service.sms.send(req.body.tel).then(function(result) {
                if (result) {
                    res.send({
                        success: true
                    });
                } else {
                    sendErr(res, '此手机已经被注册了哦');
                }
            }, function(err) {
                sendErr(res, err);
            })
        } else {
            sendErr(res, 'params error');
        }
    },
    signup: function(req, res) {
        console.log('[ API : user.signup ] ' + JSON.stringify(req.body));
        if (req.body.tel && req.body.password && req.body.name, req.body.captcha) {
            service.user.signup(req.body.tel, req.body.password, req.body.name, req.body.tel, req.body.captcha).then(function(result) {
                if (result) {
                    console.log(result);
                    req.session.regenerate(function() {
                        req.session.login = true;
                        req.session.name = result.attributes.name;
                        req.session.email = result.attributes.email;
                        req.session.emailVerified = result.attributes.emailVerified;
                        req.session.userid = result.attributes.timeStamp;
                        res.send({
                            success: true
                        });
                    });
                } else {
                    console.log(result);
                    res.send({
                        success: false
                    });
                }
            }, function(err) {
                console.log(err);
                sendErr(res, err);
            })
        } else {
            sendErr(res, 'params error');
        }
    },
    login: function(req, res) {
        service.user.login(req.body.username, req.body.password).then(function(result) {
            console.log(result);
            //service.user.login('starkwang', '123456').then(function(result) {
            req.session.regenerate(function() {
                req.session.login = true;
                req.session.name = result.attributes.name;
                req.session.email = result.attributes.email;
                req.session.emailVerified = result.attributes.emailVerified;
                req.session.userid = result.attributes.timeStamp;
                res.send({
                    success: true
                });
            }, function(err) {
                sendErr(res, err);
            });

        }, function(err) {
            sendErr(res, 'params error');
        })
    },
    logout: function(req, res) {
        res.clearCookie('connect.sid');
        res.send({
            success: true
        })
    },
    setName: function(req, res) {
        if (req.body.name && req.session.login) {
            service.user.setName(req.session.userid, req.body.name).then(function(result) {
                req.session.name = req.body.name;
                res.send({
                    success: true
                })
            }, function(err) {
                sendErr(res, err);
            })
        } else {
            sendErr(res, 'params error');
        }
    },
    getItem: function(req, res) {

    },
    myItem: function(req, res) {
        console.log(req.body);
        if (req.session.login) {
            var query = {
                publisher_id: req.session.userid
            };
            var config = {
                start: req.body.start,
                amount: req.body.amount
            }
            service.item.equalTo(query, config).then(function(results) {
                var items = [];
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    items.push({
                        image: object.get('imgPaths'),
                        price: object.get('price'),
                        name: object.get('name'),
                        location: object.get('location'),
                        publisher_id: object.get('publisher_id'),
                        publisher_name: object.get('publisher_name'),
                        pubTimeStamp: object.get('pubTimeStamp'),
                        status: object.get('status')
                    })
                }
                res.send(items.reverse());
                res.end();
            }, function(err) {
                sendErr(res, err);
            })
        } else {
            sendErr(res, 'not login');
        }
    },
    setInfo: function(req, res) {
        if (!(req.body.userid && req.body.name)) {
            sendErr(res, 'params err');
            return
        }
        if (!/^[0-9]{13}$/.test(req.body.userid)) {
            sendErr(res, 'userid must be numbers');
            return;
        }
        var userid = parseInt(req.body.userid);
        var name = req.body.name;
        service.user.setName(userid, name).then(function(result) {
            console.log('success');
            res.send({
                success: true
            })
        }, function(err) {
            sendErr(res, err);
            console.log(err);
        });
    },
    requestMailVerify: function(req, res) {
        if (req.body.mailAddress && req.session.login) {
            service.user.requestMailVerify(req.body.mailAddress + "@fudan.edu.cn", req.session.userid).then(function(result) {
                res.send({
                    success: true
                });
            }, function(err) {
                sendErr(res, err);
            })
        } else {
            sendErr(res, 'not login or params error');
        }
    },
    mailVerify: function(req, res) {
        service.user.mailVerify(req.params.objectId).then(function(result) {
            req.session.email = result.attributes.email;
            req.session.emailVerified = result.attributes.emailVerified;
            res.send("<script>alert('验证成功！');window.location.pathname='/';</script>");
        }, function(err) {
            sendErr(res, err);
        });
    },
    requestPasswordReset: function(req, res) {
        if (req.body.tel) {
            console.log('[ API : user.requestPasswordReset ] ' + JSON.stringify(req.body));
            service.user.requestPasswordReset(req.body.tel).then(function(result) {
                res.send({
                    success: true
                });
            }, function(err) {
                sendErr(res, err);
            })
        } else {
            sendErr(res, 'params error');
        }
    },
    resetPassword: function(req, res) {
        if (req.body.captcha && req.body.newPassword) {
            console.log('[ API : user.resetPassword ] ' + JSON.stringify(req.body));
            service.user.resetPassword(req.body.captcha, req.body.newPassword).then(function(result) {
                res.send({
                    success: true
                });
            }, function(err) {
                sendErr(res, err);
            })
        } else {
            sendErr(res, 'params error');
        }
    },
    localInfo: function(req, res) {
        var info = {
            login: req.session.login || false,
            userName: req.session.name || false,
            userID: req.session.userid || false
        }
        res.send(info);
    }
};

module.exports = user;