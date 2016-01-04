var login = require('./login');
var mail = require('./mail');
var comment = require('./commentService')
var sms = require('./sms');
var Promise = require('bluebird');
var AV = require('avoscloud-sdk');
var moment = require('moment');
var redis = require('redis');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
var redisClient = redis.createClient(6379, '127.0.0.1');
var setting = require('./setting');
AV.initialize(setting.leancloud.appid, setting.leancloud.appkey);
var Item = AV.Object.extend('Item');
var fs = Promise.promisifyAll(require("fs"));
var itemGetCache = {};
var itemGetTodayNewItemAmountCache = false;
setInterval(function() {
    console.log('flush!!!!!!');
    itemGetTodayNewItemAmountCache = false;
}, 60000);

var item = {
    publish: function(params) {
        var item = new Item();
        params.randomStamp = Math.floor(Math.random() * 10000000000000000);
        params.pubTimeStamp = new Date().getTime();
        params.isVerified = false;
        return item.save(params);
    },
    collection: function(params) {
        var category = params.category;
        var amount = parseInt(params.amount);
        var start = parseInt(params.start);
        return redisClient.getAsync(category).then(function(value) {
                if (value) {
                    var collection = JSON.parse(value);
                    return Promise.resolve(collection.slice(start, start + amount));
                } else {
                    console.log('api!!!!!!!!!!!!!!!!!!');
                    var itemQuery = new AV.Query(Item);
                    itemQuery.greaterThan("createdAt", new Date("2015-06-26 18:37:09"));
                    if (category != 'all') {
                        itemQuery.equalTo('category', category);
                    }
                    itemQuery.notContainedIn("status", ["saled", "undercarriage"]);
                    itemQuery.descending("pubTimeStamp");
                    return itemQuery.find().then(function(results) {
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
                        redisClient.setAsync(category, JSON.stringify(items));
                        redisClient.expire(category, 60);
                        console.log(items);
                        return items.slice(start, start + amount);
                    })
                }
            })
            // var itemQuery = new AV.Query(Item);
            // itemQuery.greaterThan("createdAt", new Date("2015-06-26 18:37:09"));
            // if (category != 'all') {
            //     itemQuery.equalTo('category', category);
            // }
            // itemQuery.skip(params.start);
            // itemQuery.limit(params.amount);
            // itemQuery.notContainedIn("status", ["saled", "undercarriage"]);
            // itemQuery.descending("pubTimeStamp");
            // return itemQuery.find();
    },
    get: function(pubTimeStamp) {
        //使用缓存
        return redisClient.getAsync(pubTimeStamp.toString()).then(function(value) {
            if (value && value != 'updated') {
                console.log('use cache:' + pubTimeStamp);
                var item = value == 'none' ? false : JSON.parse(value);
                return Promise.resolve(item);
            } else {
                console.log('use api:' + pubTimeStamp);
                var itemQuery = new AV.Query(Item);
                itemQuery.equalTo("pubTimeStamp", parseInt(pubTimeStamp));
                return itemQuery.find().then(function(result) {
                    if (result.length > 0) {
                        var item = {
                            id: result[0].id,
                            status: result[0].get('status'),
                            images: result[0].get('imgPaths'),
                            name: result[0].get('name'),
                            tel: result[0].get('tel'),
                            location: result[0].get('location'),
                            price: result[0].get('price'),
                            detail: result[0].get('detail').split('\n'),
                            qq: result[0].get('qq'),
                            wechat: result[0].get('wechat'),
                            stuNo: result[0].get('stuNo'),
                            noBargain: result[0].get('noBargain'),
                            category: result[0].get('category'),
                            //categoryEn: nameFliter.ch2en(result[0].get('category')),
                            publisher_name: result[0].get('publisher_name'),
                            publisher_id: result[0].get('publisher_id'),
                            pubTime: moment(parseInt(result[0].get('pubTimeStamp'))).format('YYYY/MM/DD HH:mm:ss')
                        }
                        redisClient.setAsync(pubTimeStamp.toString(), JSON.stringify(item));
                        redisClient.expire(pubTimeStamp.toString(), 600);
                        return item;
                    } else {
                        redisClient.setAsync(pubTimeStamp.toString(), 'none');
                        redisClient.expire(pubTimeStamp.toString(), 600);
                        return false;
                    }
                });

            }
        });
        // if (itemGetCache[pubTimeStamp]) {
        //     console.log('use cache:' + itemGetCache[pubTimeStamp]);
        //     return Promise.resolve(itemGetCache[pubTimeStamp]);
        // } else {
        //     console.log('use api');
        //     var itemQuery = new AV.Query(Item);
        //     itemQuery.equalTo("pubTimeStamp", parseInt(pubTimeStamp));
        //     itemQuery.find().then(function(result) {
        //         itemGetCache[pubTimeStamp] = result;
        //         redisClient.setAsync(pubTimeStamp.toString(), JSON.stringify(result))
        //     });
        //     return itemQuery.find();
        // }
    },
    equalTo: function(params, config) {
        var itemQuery = new AV.Query(Item);
        for (attr in params) {
            itemQuery.equalTo(attr, params[attr]);
        }
        itemQuery.skip(config.start);
        itemQuery.limit(config.amount);
        return itemQuery.find();
    },
    update: function(objectId, params, itemTimeStamp) {
        var item = AV.Object.createWithoutData('Item', objectId);
        item.set('name', params.name);
        item.set('category', params.category);
        item.set('noBargain', params.noBargain);
        item.set('tel', params.tel || '');
        item.set('qq', params.qq || '');
        item.set('location', params.location);
        item.set('price', params.price);
        if (params.detail.join) {
            item.set('detail', params.detail.join('\n'));
        } else {
            item.set('detail', params.detail);
        }

        item.set('wechat', params.wechat || '');
        return item.save().then(function() {
            redisClient.setAsync(itemTimeStamp.toString(), 'updated');
        });
    },
    setStatus: function(objectId, status, itemTimeStamp) {
        var item = AV.Object.createWithoutData('Item', objectId);
        item.set('status', status);
        return item.save().then(function() {
            redisClient.setAsync(itemTimeStamp.toString(), 'updated');
        });
    },
    getTodayNewItemAmount: function() {
        if (itemGetTodayNewItemAmountCache) {
            console.log('use amount cache');
            return Promise.resolve(itemGetTodayNewItemAmountCache);
        } else {
            console.log('use amount api');
            var date = new Date();
            var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' 00:00:00';
            var categories = ['电器日用', '校园代步', '闲置数码', '美妆衣物', '图书教材', '运动棋牌', '票券小物'];
            var amount = {};
            return Promise.map(categories, function(category) {
                var itemQuery = new AV.Query(Item);
                itemQuery.greaterThan("createdAt", new Date(dateStr));
                itemQuery.equalTo('category', category);
                itemQuery.notContainedIn("status", ["saled", "undercarriage"]);
                return itemQuery.find().then(function(result) {
                    amount[category] = result.length;
                });
            }).then(function() {
                itemGetTodayNewItemAmountCache = amount;
                return amount;
            });
        }
    },
    getBannerItem: function() {
        var itemQuery = new AV.Query(Item);
        itemQuery.equalTo('isInBanner', true);
        itemQuery.descending("pubTimeStamp");
        return itemQuery.find();
    }
};

var user = {
    signup: function(username, password, name, tel, captcha) {
        console.log('signup:' + username + '/' + password);
        var query = new AV.Query(AV.User);
        query.equalTo("username", username.toString());
        return query.find().then(function(result) {
            if (result.length > 0) {
                return false;
            } else {
                return true;
            }
        }).then(function(noConflict) {
            if (noConflict) {
                var user = new AV.User();
                var params = {
                    mobilePhoneNumber: tel,
                    smsCode: captcha,
                    username: username,
                    password: password,
                    pwd: password,
                    name: name,
                    timeStamp: new Date().getTime()
                };
                return user.signUpOrlogInWithMobilePhone(params)
            } else {
                return false;
            }
        }).then(function(user) {
            if (user) {
                user.set("username", tel);
                user.set("password", password);
                return user.signUp();
            } else {
                return false;
            }
        });

        console.log('service:' + JSON.stringify(params));

    },
    login: function(username, password) {
        return AV.User.logIn(username, password);
    },

    //leancloud 不允许未登录时修改用户数据，这里是模拟登陆的hack
    loginHack: function(userid) {
        return this.getUserByUserId(userid)
            .then(function(user) {
                return AV.User.logIn(user.get('username'), user.get('pwd'));
            })
    },
    setName: function(userid, name) {
        return this.setInfo(userid, 'name', name);
    },
    setInfo: function(userid, attr, data) {
        return this.loginHack(userid)
            .then(function(user) {
                user.set(attr, data)
                return user.save();
            }, function(err) {
                return err;
            });
    },
    getUserByUserId: function(userid) {
        console.log(userid);
        var query = new AV.Query(AV.User);
        query.equalTo("timeStamp", parseInt(userid));
        return query.find()
            .then(function(result) {
                if (result.length > 0) {
                    var query = new AV.Query(AV.User);
                    // query.get(result[0].id).then(function(user){
                    //     getUserByUserIdCache[result[0].id] = user;
                    // })
                    return query.get(result[0].id);
                } else {
                    return Promise.resolve('none');
                }
            });
    },
    requestMailVerify: function(mailAddress, userid) {
        var objectId;
        return this.loginHack(userid)
            .then(function(user) {
                objectId = user.id;
                user.set('email', mailAddress);
                return user.save();
            })
            .then(function(user) {
                return fs.readFileAsync("./src/service/mail.html", "utf8");
            })
            .then(function(contents) {
                return mail.send(mailAddress, "【复旦二手工坊账号验证】", contents.replace(/{{user_id}}/ig, objectId));
            }, function(err) {
                return err;
            })

    },
    mailVerify: function(objectId) {
        var query = new AV.Query(AV.User);
        return query.get(objectId)
            .then(function(user) {
                return AV.User.logIn(user.get('username'), user.get('pwd')).then(function(user) {
                    user.set('emailVerified', true);
                    return user.save();
                })
            }, function(err) {
                return err;
            });
    },
    requestPasswordReset: function(tel) {
        return AV.User.requestPasswordResetBySmsCode(tel);
    },
    resetPassword: function(captcha, newPassword) {
        return AV.User.resetPasswordBySmsCode(captcha, newPassword)
            .then(function(result) {
                var query = new AV.Query(AV.User);
                return query.get(result.objectId);
            })
            .then(function(user) {
                return AV.User.logIn(user.get('username'), newPassword);
            })
            .then(function(user) {
                user.set('pwd', newPassword);
                return user.save();
            }, function(err) {
                return err;
            })
    }
};


module.exports = {
    item: item,
    login: login,
    mail: mail,
    user: user,
    sms: sms,
    comment: comment
}
