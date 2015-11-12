service = require('../service/service');
var item = {
    // '/api/item/collection' GET
    collection: function(req, res) {
        var params = {
            amount: req.body.amount,
            start: req.body.start,
        }
        service.item.collection(params).then(function(results) {
            var items = [];
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                items.push({
                    image: object.get('imgPaths'),
                    price: object.get('price'),
                    content: object.get('name'),
                    id: object.id
                })
            }
            res.send(items.reverse());
            res.end();
        });
    },

    // '/api/item/publish' POST
    publish: function(req, res) {
        service.item.publish(req.body).then(function(result) {
            console.log(result);
            res.send({
                success: true,
                id: result.id
            })
        })
    }
}
module.exports = {
    item: item
}
