// var service = require('../service/service');
// var moment = require('moment');
var user = require('./user');
var item = require('./item');
var comment = require('./comment');
var notification = require('./notification');

// function sendErr(res, message) {
//     res.send({
//         success: false,
//         message: message
//     });
// }
// var item = {
//     // '/api/item/collection' GET
//     collection: function(req, res) {
//         service.item.collection(req.query)
//             .then(function(results) {
//                 res.send(results)
//             }, function(err) {
//                 sendErr(res, err);
//             });
//     },

//     // '/api/item/publish' POST
//     publish: function(req, res) {
//         if (req.session.login && req.session.emailVerified && req.body.name && req.body.detail && req.body.price && (req.body.tel || req.body.wechat || req.body.qq) && req.body.category && req.body.imgPaths.length > 0) {
//             req.body.publisher_id = req.session.userid;
//             req.body.publisher_name = req.session.name
//             service.item.publish(req.body)
//                 .then(function(result) {
//                     console.log(result);
//                     res.send({
//                         success: true,
//                         pubTimeStamp: result.get('pubTimeStamp')
//                     })
//                 }, function(err) {
//                     sendErr(res, err);;
//                 });
//         } else {
//             sendErr(res, 'params error');
//         }

//     },
//     // '/api/item/get/' GET
//     get: function(req, res) {
//         if (req.query.id) {
//             service.item.get(req.query.id)
//                 .then(function(item) {
//                     console.log(item);
//                     res.send(item);
//                 }, function(err) {
//                     sendErr(res, err);;
//                 });
//         } else {
//             sendErr(res, 'params error');;
//         }
//     },
//     // '/api/item/equal_to' POST
//     equalTo: function(req, res) {
//         if (req.body) {
//             service.item.equalTo(req.body)
//                 .then(function(result) {
//                     res.send(result);
//                 }, function(err) {
//                     sendErr(res, err);;
//                 })
//         } else {
//             sendErr(res, 'params error');
//         }
//     },
//     update: function(req, res) {
//         if (req.session.login && req.body.itemTimeStamp && req.body.params.name && req.body.params.detail && req.body.params.price && (req.body.params.tel || req.body.params.wechat || req.body.params.qq) && req.body.params.category) {
//             service.item.get(req.body.itemTimeStamp).then(function(result) {
//                 var publisher_id = result['publisher_id'];
//                 var objectId = result.id;
//                 console.log(objectId);
//                 if (req.session.userid == publisher_id) {
//                     service.item.update(objectId, req.body.params, req.body.itemTimeStamp).then(function(result) {
//                         console.log(result);
//                         res.send({
//                             success: true
//                         })
//                     }, function(err) {
//                         console.log(err);
//                         sendErr(res, err);;
//                     });
//                 } else {
//                     sendErr(res, 'auth error');
//                 }
//             })
//         } else {
//             sendErr(res, 'params error');
//         }
//     },
//     setStatus: function(req, res) {
//         console.log(req.session);
//         if (req.session.login && req.body.itemTimeStamp && req.body.status) {
//             service.item.get(req.body.itemTimeStamp).then(function(result) {
//                 var publisher_id = result['publisher_id'];
//                 var objectId = result.id;
//                 if (req.session.userid == publisher_id) {
//                     console.log('认证成功，修改！');
//                     service.item.setStatus(objectId, req.body.status, req.body.itemTimeStamp).then(function(result) {
//                         console.log(result);
//                         res.send({
//                             success: true
//                         })
//                     }, function(err) {
//                         console.log(err);
//                         sendErr(res, err);;
//                     });
//                 } else {
//                     sendErr(res, 'auth error');
//                 }
//             })
//         } else {
//             sendErr(res, 'params error');
//         }
//     },
//     getTodayNewItemAmount: function(req, res) {
//         service.item.getTodayNewItemAmount().then(function(result) {
//             res.send(result);
//         }, function(err) {
//             sendErr(res, err);
//         })
//     }
// };

// var user = {
//     requestTelVerify: function(req, res) {
//         console.log('[ API : user.telVerify ] ' + JSON.stringify(req.body));
//         if (req.body.tel) {
//             service.sms.send(req.body.tel).then(function(result) {
//                 if (result) {
//                     res.send({
//                         success: true
//                     });
//                 } else {
//                     sendErr(res, '此手机已经被注册了哦');
//                 }
//             }, function(err) {
//                 sendErr(res, err);
//             })
//         } else {
//             sendErr(res, 'params error');
//         }
//     },
//     signup: function(req, res) {
//         console.log('[ API : user.signup ] ' + JSON.stringify(req.body));
//         if (req.body.tel && req.body.password && req.body.name, req.body.captcha) {
//             service.user.signup(req.body.tel, req.body.password, req.body.name, req.body.tel, req.body.captcha).then(function(result) {
//                 if (result) {
//                     console.log(result);
//                     req.session.regenerate(function() {
//                         req.session.login = true;
//                         req.session.name = result.attributes.name;
//                         req.session.email = result.attributes.email;
//                         req.session.emailVerified = result.attributes.emailVerified;
//                         req.session.userid = result.attributes.timeStamp;
//                         res.send({
//                             success: true
//                         });
//                     });
//                 } else {
//                     console.log(result);
//                     res.send({
//                         success: false
//                     });
//                 }
//             }, function(err) {
//                 console.log(err);
//                 sendErr(res, err);
//             })
//         } else {
//             sendErr(res, 'params error');
//         }
//     },
//     login: function(req, res) {
//         service.user.login(req.body.username, req.body.password).then(function(result) {
//             console.log(result);
//             //service.user.login('starkwang', '123456').then(function(result) {
//             req.session.regenerate(function() {
//                 req.session.login = true;
//                 req.session.name = result.attributes.name;
//                 req.session.email = result.attributes.email;
//                 req.session.emailVerified = result.attributes.emailVerified;
//                 req.session.userid = result.attributes.timeStamp;
//                 res.send({
//                     success: true
//                 });
//             }, function(err) {
//                 sendErr(res, err);
//             });

//         }, function(err) {
//             sendErr(res, 'params error');
//         })
//     },
//     logout: function(req, res) {
//         res.clearCookie('connect.sid');
//         res.send({
//             success: true
//         })
//     },
//     setName: function(req, res) {
//         if (req.body.name && req.session.login) {
//             service.user.setName(req.session.userid, req.body.name).then(function(result) {
//                 req.session.name = req.body.name;
//                 res.send({
//                     success: true
//                 })
//             }, function(err) {
//                 sendErr(res, err);
//             })
//         } else {
//             sendErr(res, 'params error');
//         }
//     },
//     getItem: function(req, res) {

//     },
//     myItem: function(req, res) {
//         console.log(req.body);
//         if (req.session.login) {
//             var query = {
//                 publisher_id: req.session.userid
//             };
//             var config = {
//                 start: req.body.start,
//                 amount: req.body.amount
//             }
//             service.item.equalTo(query, config).then(function(results) {
//                 var items = [];
//                 for (var i = 0; i < results.length; i++) {
//                     var object = results[i];
//                     items.push({
//                         image: object.get('imgPaths'),
//                         price: object.get('price'),
//                         name: object.get('name'),
//                         location: object.get('location'),
//                         publisher_id: object.get('publisher_id'),
//                         publisher_name: object.get('publisher_name'),
//                         pubTimeStamp: object.get('pubTimeStamp'),
//                         status: object.get('status')
//                     })
//                 }
//                 res.send(items.reverse());
//                 res.end();
//             }, function(err) {
//                 sendErr(res, err);
//             })
//         } else {
//             sendErr(res, 'not login');
//         }
//     },
//     setInfo: function(req, res) {
//         if (!(req.body.userid && req.body.name)) {
//             sendErr(res, 'params err');
//             return
//         }
//         if (!/^[0-9]{13}$/.test(req.body.userid)) {
//             sendErr(res, 'userid must be numbers');
//             return;
//         }
//         var userid = parseInt(req.body.userid);
//         var name = req.body.name;
//         service.user.setName(userid, name).then(function(result) {
//             console.log('success');
//             res.send({
//                 success: true
//             })
//         }, function(err) {
//             sendErr(res, err);
//             console.log(err);
//         });
//     },
//     requestMailVerify: function(req, res) {
//         if (req.body.mailAddress && req.session.login) {
//             service.user.requestMailVerify(req.body.mailAddress + "@fudan.edu.cn", req.session.userid).then(function(result) {
//                 res.send({
//                     success: true
//                 });
//             }, function(err) {
//                 sendErr(res, err);
//             })
//         } else {
//             sendErr(res, 'not login or params error');
//         }
//     },
//     mailVerify: function(req, res) {
//         service.user.mailVerify(req.params.objectId).then(function(result) {
//             req.session.email = result.attributes.email;
//             req.session.emailVerified = result.attributes.emailVerified;
//             res.send("<script>alert('验证成功！');window.location.pathname='/';</script>");
//         }, function(err) {
//             sendErr(res, err);
//         });
//     },
//     requestPasswordReset: function(req, res) {
//         if (req.body.tel) {
//             console.log('[ API : user.requestPasswordReset ] ' + JSON.stringify(req.body));
//             service.user.requestPasswordReset(req.body.tel).then(function(result) {
//                 res.send({
//                     success: true
//                 });
//             }, function(err) {
//                 sendErr(res, err);
//             })
//         } else {
//             sendErr(res, 'params error');
//         }
//     },
//     resetPassword: function(req, res) {
//         if (req.body.captcha && req.body.newPassword) {
//             console.log('[ API : user.resetPassword ] ' + JSON.stringify(req.body));
//             service.user.resetPassword(req.body.captcha, req.body.newPassword).then(function(result) {
//                 res.send({
//                     success: true
//                 });
//             }, function(err) {
//                 sendErr(res, err);
//             })
//         } else {
//             sendErr(res, 'params error');
//         }
//     },
//     localInfo: function(req, res) {
//         var info = {
//             login: req.session.login || false,
//             userName: req.session.name || false,
//             userID: req.session.userid || false
//         }
//         res.send(info);
//     }
// };

// var comment = {
//     add: function(req, res) {
//         if (req.body.itemID && req.body.content && req.session.login) {

//             service.item.get(req.body.itemID).then(function(result) {
//                 if (result) {
//                     var commentModel = {
//                         itemID: req.body.itemID,
//                         itemName: result.name,

//                         ownerID: result.publisher_id,
//                         ownerName: result.publisher_name,

//                         publisherName: req.session.name,
//                         publisherID: req.session.userid,

//                         isReply: req.body.isReply || false,
//                         targetName: req.body.targetName || '',
//                         targetID: req.body.targetID || '',

//                         content: req.body.content,

//                         haveBeenRead: false,

//                         timeStamp: new Date().getTime()
//                     }
//                     service.comment.add(commentModel).then(function(result) {
//                         res.send({
//                             success: true,
//                             comment: commentModel
//                         });
//                     }, function(err) {
//                         sendErr(res, err);
//                     })
//                 } else {
//                     sendErr(res, "no such item");
//                 }
//             })

//         } else {
//             sendErr(res, "params error");
//         }
//     },
//     getItemComment: function(req, res) {
//         if (req.query.itemID) {
//             var params = {
//                 itemID: req.query.itemID
//             }
//             service.comment.find(params).then(function(result) {
//                 res.send({
//                     success: true,
//                     comments: result
//                 });
//             }, function(err) {
//                 sendErr(res, err);
//             })
//         } else {
//             sendErr(res, "params error");
//         }
//     },
//     remove: function(req, res) {
//         if (req.body.commentTimeStamp && req.session.login) {
//             service.comment.remove(req.body.commentTimeStamp, req.session.userid).then(function(result) {
//                 if (result.success) {
//                     res.send({
//                         success: true
//                     })
//                 } else {
//                     sendErr(res, 'err');
//                 }

//             }, function(err) {
//                 sendErr(res, err);
//             })
//         } else {
//             sendErr(res, "params error");
//         }
//     }
// }

// var notification = {
//     getNewNotification: function(req, res) {
//         if (req.session.login) {
//             var works = [];
//             service.comment.getNewNotification(req.session.userid)
//                 .then(function(result) {
//                     var notifications = [];

//                     result.forEach(function(item) {
//                         if (item.publisherID != req.session.userid) {
//                             notifications.push({
//                                 type: item.isReply ? "reply" : "comment",
//                                 sponsor: item.publisherName,

//                                 itemName: item.itemName,
//                                 itemID: item.itemID
//                             })
//                         }
//                     })
//                     res.send({
//                         success: true,
//                         notifications: notifications
//                     })
//                 })
//         } else {
//             res.send({});
//         }

//     },
//     clearNewNotification: function(req, res) {
//         if (req.session.login && req.query.itemID) {
//             service.comment.clearNewNotification(req.session.userid, req.query.itemID);
//             res.send({});
//         }
//     }
// }

module.exports = {
    item: item,
    user: user,
    comment: comment,
    notification: notification
}
