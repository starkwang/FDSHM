service = require('../service/service');
moment = require('moment');

function sendErr(res, message) {
    res.send({
        success: false,
        message: message
    });
}

var item = {
    // '/api/item/collection' GET
    collection: function(req, res) {
        service.item.collection(req.query)
            .then(function(results) {
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
                        pubTime: moment(parseInt(object.get('pubTimeStamp'))).fromNow()
                    })
                }
                res.send(items);
                res.end();
            }, function(err) {
                sendErr(res, err);
            });
    },

    // '/api/item/publish' POST
    publish: function(req, res) {
        console.log(req.body);
        if (req.session.login && req.session.emailVerified && req.body.name && req.body.detail && req.body.price && req.body.tel && req.body.category && req.body.imgPaths.length > 0) {
            req.body.publisher_id = req.session.userid;
            req.body.publisher_name = req.session.name
            service.item.publish(req.body)
                .then(function(result) {
                    console.log(result);
                    res.send({
                        success: true,
                        //id: result.id
                    })
                }, function(err) {
                    sendErr(res, err);;
                });
        } else {
            sendErr(res, 'params error');
        }

    },
    // '/api/item/get/' GET
    get: function(req, res) {
        if (req.query.id) {
            service.item.get(req.query.id)
                .then(function(result) {
                    var item = result[0];
                    res.send({
                        images: item.get('imgPaths'),
                        name: item.get('name'),
                        category: item.get('category'),
                        tel: item.get('tel'),
                        location: item.get('location'),
                        price: item.get('price'),
                        detail: item.get('detail').split('\n'),
                        qq: item.get('qq'),
                        wechat: item.get('wechat'),
                        stuNo: item.get('stuNo'),
                        pubTime: item.createdAt.toLocaleDateString() + '  ' + item.createdAt.toLocaleTimeString()
                    })
                }, function(err) {
                    sendErr(res, err);;
                });
        } else {
            sendErr(res, 'params error');;
        }
    },
    // '/api/item/equal_to' POST
    equalTo: function(req, res) {
        if (req.body) {
            service.item.equalTo(req.body)
                .then(function(result) {
                    res.send(result);
                }, function(err) {
                    sendErr(res, err);;
                })
        } else {
            sendErr(res, 'params error');
        }
    },
    update: function(req, res) {
        if (req.session.login && req.body.itemTimeStamp && req.body.params.name && req.body.params.detail && req.body.params.price && req.body.params.tel && req.body.params.category) {
            service.item.get(req.body.itemTimeStamp).then(function(result) {
                var publisher_id = result[0].get('publisher_id');
                var objectId = result[0].id;
                if (req.session.userid == publisher_id) {
                    service.item.update(objectId, req.body.params, req.body.itemTimeStamp).then(function(result) {
                        console.log(result);
                        res.send({
                            success: true
                        })
                    }, function(err) {
                        console.log(err);
                        sendErr(res, err);;
                    });
                } else {
                    sendErr(res, 'auth error');
                }
            })
        } else {
            sendErr(res, 'params error');
        }
    },
    setStatus: function(req, res) {
        console.log(req.session);
        if (req.session.login && req.body.itemTimeStamp && req.body.status) {
            service.item.get(req.body.itemTimeStamp).then(function(result) {
                var publisher_id = result[0].get('publisher_id');
                var objectId = result[0].id;
                if (req.session.userid == publisher_id) {
                    console.log('认证成功，修改！');
                    service.item.setStatus(objectId, req.body.status, req.body.itemTimeStamp).then(function(result) {
                        console.log(result);
                        res.send({
                            success: true
                        })
                    }, function(err) {
                        console.log(err);
                        sendErr(res, err);;
                    });
                } else {
                    sendErr(res, 'auth error');
                }
            })
        } else {
            sendErr(res, 'params error');
        }
    }
};

var user = {
    requestTelVerify: function(req, res) {
        console.log('[ API : user.telVerify ] ' + JSON.stringify(req.body));
        if (req.body.tel) {
            service.sms.send(req.body.tel).then(function(result) {
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
    signup: function(req, res) {
        console.log('[ API : user.signup ] ' + JSON.stringify(req.body));
        if (req.body.tel && req.body.password && req.body.name, req.body.captcha) {
            service.user.signup(req.body.tel, req.body.password, req.body.name, req.body.tel, req.body.captcha).then(function(result) {
                if (result) {
                    res.send({
                        success: true
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
    requestMailVerify: function(req, res) {
        if (/^[0-9]{11}@fudan.edu.cn$/.test(req.body.mailAddress) && req.session.login) {
            service.user.requestMailVerify(req.body.mailAddress, req.session.userid).then(function(result) {
                res.send({
                    success: true
                });
            }, function(err) {
                sendErr(res, err);
            })
        } else {
            sendErr(res, 'not login or mailaddress erro');
        }
    },
    mailVerify: function(req, res) {
        if (req.session.login) {
            service.user.mailVerify(req.params.objectId).then(function(result) {
                req.session.email = result.attributes.email;
                req.session.emailVerified = result.attributes.emailVerified;
                res.send('<script>alert("验证成功!");window.location.pathname="/";</script>');
            }, function(err) {
                sendErr(res, err);
            })
        } else {
            sendErr(res, 'not login');
        }
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
    }
};

module.exports = {
    item: item,
    user: user
}
