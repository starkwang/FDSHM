AV = require('avoscloud-sdk');
login = require('./login');
mail = require('./mail');

AV.initialize('YDTUXYEl6XT9bhNzsBAdDIYm', 'HvxtrUGyHQjUdaeIG5HHM0JE');
var Item = AV.Object.extend('Item');

var item = {
    publish: function(params) {
        var item = new Item();
        params.randomStamp = Math.random() * 10000000000000000;
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
    get: function(id) {
        var itemQuery = new AV.Query(Item);
        itemQuery.equalTo("objectId", id);
        return itemQuery.find();
    }
}




module.exports = {
    item: item,
    login: login,
    mail: mail
}
