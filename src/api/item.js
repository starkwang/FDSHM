var service = require('../service/service');
var moment = require('moment');
var user = require('./user');
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
                res.send(results)
            }, function(err) {
                sendErr(res, err);
            });
    },

    // '/api/item/publish' POST
    publish: function(req, res) {
        if (req.session.login && req.session.emailVerified && req.body.name && req.body.detail && req.body.price && (req.body.tel || req.body.wechat || req.body.qq) && req.body.category && req.body.imgPaths.length > 0) {
            req.body.publisher_id = req.session.userid;
            req.body.publisher_name = req.session.name
            service.item.publish(req.body)
                .then(function(result) {
                    console.log(result);
                    res.send({
                        success: true,
                        pubTimeStamp: result.get('pubTimeStamp')
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
                .then(function(item) {
                    console.log(item);
                    res.send(item);
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
        if (req.session.login && req.body.itemTimeStamp && req.body.params.name && req.body.params.detail && req.body.params.price && (req.body.params.tel || req.body.params.wechat || req.body.params.qq) && req.body.params.category) {
            service.item.get(req.body.itemTimeStamp).then(function(result) {
                var publisher_id = result['publisher_id'];
                var objectId = result.id;
                console.log(objectId);
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
                var publisher_id = result['publisher_id'];
                var objectId = result.id;
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
    },
    getTodayNewItemAmount: function(req, res) {
        service.item.getTodayNewItemAmount().then(function(result) {
            res.send(result);
        }, function(err) {
            sendErr(res, err);
        })
    }
};

module.exports = item;