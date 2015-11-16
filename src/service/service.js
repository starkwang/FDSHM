AV = require('avoscloud-sdk');
login = require('./login');
mail = require('./mail');
Promise = require('bluebird');
AV.initialize('YDTUXYEl6XT9bhNzsBAdDIYm', 'HvxtrUGyHQjUdaeIG5HHM0JE');
var Item = AV.Object.extend('Item');

var itemGetCache = {};
var item = {
    publish: function(params) {
        var item = new Item();
        params.randomStamp = Math.floor(Math.random() * 10000000000000000);
        params.pubTimeStamp = new Date().getTime();
        params.isVertified = false;
        return item.save(params);
    },
    collection: function(params) {
        var itemQuery = new AV.Query(Item);
        itemQuery.greaterThan("createdAt", new Date("2015-06-26 18:37:09"));
        if (params.category != 'all') {
            itemQuery.equalTo('category', params.category);
        }
        console.log(params.category);
        itemQuery.skip(params.start);
        itemQuery.limit(params.amount);
        return itemQuery.find();
    },
    get: function(pubTimeStamp) {
        console.log(pubTimeStamp);
        //使用缓存
        if (itemGetCache[pubTimeStamp]) {
            console.log('use cache:' + itemGetCache[pubTimeStamp]);
            return Promise.resolve(itemGetCache[pubTimeStamp]);
        } else {
            console.log('use api');
            var itemQuery = new AV.Query(Item);
            itemQuery.equalTo("pubTimeStamp", parseInt(pubTimeStamp));
            itemQuery.find().then(function(result) {
                itemGetCache[pubTimeStamp] = result;
            });
            return itemQuery.find();
        }
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
        item.set('tel', params.tel);
        item.set('qq', params.qq);
        item.set('location', params.location);
        item.set('price', params.price);
        if (params.detail.join) {
            item.set('detail', params.detail.join('\n'));
        } else {
            item.set('detail', params.detail);
        }

        item.set('wechat', params.wechat);
        return item.save().then(function() {
            itemGetCache[itemTimeStamp] = null;
        });
    }
};

var user = {
    signup: function(username, email, password, name) {
        var user = new AV.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        user.set("name", name);
        user.set('timeStamp', new Date().getTime());
        return user.signUp();
    },
    login: function(username, password) {
        return AV.User.logIn(username, password);
    }
};


module.exports = {
    item: item,
    login: login,
    mail: mail,
    user: user
}
