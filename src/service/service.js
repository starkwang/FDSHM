AV = require('avoscloud-sdk');
login = require('./login');

AV.initialize('YDTUXYEl6XT9bhNzsBAdDIYm', 'HvxtrUGyHQjUdaeIG5HHM0JE');
var Item = AV.Object.extend('Item');

var item = {
    publish: function(params) {
        var item = new Item();
        return item.save(params);
    },
    collection: function(params) {
        var itemQuery = new AV.Query(Item);
        itemQuery.greaterThan("createdAt", new Date("2015-06-26 18:37:09"));
        itemQuery.skip(params.start);
        itemQuery.limit(params.amount);
        return itemQuery.find();
    }
}




module.exports = {
    item: item,
    login: login
}
