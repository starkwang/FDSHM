AV = require('avoscloud-sdk');
login = require('./login');
mail = require('./mail');

AV.initialize('YDTUXYEl6XT9bhNzsBAdDIYm', 'HvxtrUGyHQjUdaeIG5HHM0JE');
var Item = AV.Object.extend('Item');

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
        var itemQuery = new AV.Query(Item);
        itemQuery.equalTo("pubTimeStamp", parseInt(pubTimeStamp));
        return itemQuery.find();
    }
};

var user = {
    signup: function(username, email, password) {
        var user = new AV.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        user.set('timeStamp',new Date().getTime());
        return user.signUp();
    },
    login: function(username,password) {
        return AV.User.logIn(username, password);
    }
};


module.exports = {
    item: item,
    login: login,
    mail: mail,
    user:user
}
