var service = require('../service/service');
var moment = require('moment');

function sendErr(res, message) {
    res.send({
        success: false,
        message: message
    });
}

var comment = {
    add: function(req, res) {
        if (req.body.itemID && req.body.content && req.session.login) {

            service.item.get(req.body.itemID).then(function(result) {
                if (result) {
                    var commentModel = {
                        itemID: req.body.itemID,
                        itemName: result.name,

                        ownerID: result.publisher_id,
                        ownerName: result.publisher_name,

                        publisherName: req.session.name,
                        publisherID: req.session.userid,

                        isReply: req.body.isReply || false,
                        targetName: req.body.targetName || '',
                        targetID: req.body.targetID || '',

                        content: req.body.content,

                        haveBeenRead: false,

                        timeStamp: new Date().getTime()
                    }
                    service.comment.add(commentModel).then(function(result) {
                        res.send({
                            success: true,
                            comment: commentModel
                        });
                    }, function(err) {
                        sendErr(res, err);
                    })
                } else {
                    sendErr(res, "no such item");
                }
            })

        } else {
            sendErr(res, "params error");
        }
    },
    getItemComment: function(req, res) {
        if (req.query.itemID) {
            var params = {
                itemID: req.query.itemID
            }
            service.comment.find(params).then(function(result) {
                res.send({
                    success: true,
                    comments: result
                });
            }, function(err) {
                sendErr(res, err);
            })
        } else {
            sendErr(res, "params error");
        }
    },
    remove: function(req, res) {
        if (req.body.commentTimeStamp && req.session.login) {
            service.comment.remove(req.body.commentTimeStamp, req.session.userid).then(function(result) {
                if (result.success) {
                    res.send({
                        success: true
                    })
                } else {
                    sendErr(res, 'err');
                }

            }, function(err) {
                sendErr(res, err);
            })
        } else {
            sendErr(res, "params error");
        }
    }
}

module.exports = comment;