var service = require('../service/service');
var moment = require('moment');

function sendErr(res, message) {
    res.send({
        success: false,
        message: message
    });
}

var notification = {
    getNewNotification: function(req, res) {
        if (req.session.login) {
            var works = [];
            service.comment.getNewNotification(req.session.userid)
                .then(function(result) {
                    var notifications = [];

                    result.forEach(function(item) {
                        if (item.publisherID != req.session.userid) {
                            notifications.push({
                                type: item.isReply ? "reply" : "comment",
                                sponsor: item.publisherName,

                                itemName: item.itemName,
                                itemID: item.itemID
                            })
                        }
                    })
                    res.send({
                        success: true,
                        notifications: notifications
                    })
                })
        } else {
            res.send({});
        }

    },
    clearNewNotification: function(req, res) {
        if (req.session.login && req.query.itemID) {
            service.comment.clearNewNotification(req.session.userid, req.query.itemID);
            res.send({});
        }
    }
}

module.exports = notification;