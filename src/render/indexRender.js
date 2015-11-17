service = require('../service/service');
var cache = {};
setInterval(function(){
    cache = {};
    console.log('clear index cache');
},60000);
function render(req, res) {
    if (statusCheck(cache)) {
        console.log('use index cache');
        renderer(req, res);
        return;
    } else {
        console.log('use index api');
        service.item.collection({
            category: 'all',
            start: 0,
            amount: 8
        }).then(function(results) {
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
                    pubTimeStamp: object.get('pubTimeStamp')
                })
            }
            cache.all = items;
            if (statusCheck(cache)) {
                renderer(req, res)
            }
        });

        service.item.collection({
            category: '闲置数码',
            start: 0,
            amount: 4
        }).then(function(results) {
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
                    pubTimeStamp: object.get('pubTimeStamp')
                })
            }
            cache.digital = items;
            if (statusCheck(cache)) {
                renderer(req, res)
            }
        });
        service.item.collection({
            category: '校园代步',
            start: 0,
            amount: 4
        }).then(function(results) {
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
                    pubTimeStamp: object.get('pubTimeStamp')
                })
            }
            cache.ride = items;
            if (statusCheck(cache)) {
                renderer(req, res)
            }
        });
        service.item.collection({
            category: '电器日用',
            start: 0,
            amount: 8
        }).then(function(results) {
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
                    pubTimeStamp: object.get('pubTimeStamp')
                })
            }
            cache.commodity = items;
            if (statusCheck(cache)) {
                renderer(req, res)
            }
        });
        service.item.collection({
            category: '图书教材',
            start: 0,
            amount: 8
        }).then(function(results) {
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
                    pubTimeStamp: object.get('pubTimeStamp')
                })
            }
            cache.book = items;
            if (statusCheck(cache)) {
                renderer(req, res)
            }
        });
        service.item.collection({
            category: '美妆衣物',
            start: 0,
            amount: 8
        }).then(function(results) {
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
                    pubTimeStamp: object.get('pubTimeStamp')
                })
            }
            cache.makeup = items;
            if (statusCheck(cache)) {
                renderer(req, res)
            }
        });
        service.item.collection({
            category: '运动棋牌',
            start: 0,
            amount: 8
        }).then(function(results) {
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
                    pubTimeStamp: object.get('pubTimeStamp')
                })
            }
            cache.sport = items;
            if (statusCheck(cache)) {
                renderer(req, res)
            }
        });
        service.item.collection({
            category: '票券小物',
            start: 0,
            amount: 8
        }).then(function(results) {
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
                    pubTimeStamp: object.get('pubTimeStamp')
                })
            }
            cache.smallthing = items;
            if (statusCheck(cache)) {
                renderer(req, res)
            }
        });
    }
}

function statusCheck(cache) {
    if (cache.all && cache.digital && cache.ride && cache.commodity && cache.book && cache.makeup && cache.sport && cache.smallthing) {
        return true;
    }
}

function renderer(req, res) {
    res.render('index', {
        session: req.session ? req.session : {},
        data: cache,
        fliter: {
            digital: '闲置数码',
            ride: '校园代步',
            commodity: '电器日用',
            book: '图书教材',
            makeup: '美妆衣物',
            sport: '运动棋牌',
            smallthing: '票券小物'
        }
    })
}


module.exports = render;
