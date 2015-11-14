service = require('../service/service');
var item = {
    // '/api/item/collection' GET
    collection: function(req, res) {
        service.item.collection(req.query).then(function(results) {
            var items = [];
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                items.push({
                    image: object.get('imgPaths'),
                    price: object.get('price'),
                    content: object.get('name'),
                    pubTimeStamp: object.get('pubTimeStamp')
                })
            }
            res.send(items.reverse());
            res.end();
        });
    },

    // '/api/item/publish' POST
    publish: function(req, res) {
        console.log(req.body);
        if (req.body.name && req.body.detail && req.body.price && req.body.tel && req.body.stuNo && req.body.category && req.body.imgPaths.length > 0) {
            service.item.publish(req.body).then(function(result) {
                console.log(result);
                res.send({
                    success: true,
                    //id: result.id
                })
            })
        } else {
            res.send({
                success: false,
            })
        }

    }
};

var user = {
    signup: function(req, res) {
        service.user.signup(req.body.username, req.body.email, req.body.password).then(function(result) {
            if (result) {
                res.send({
                    success: true
                });
            }
        }, function(err) {
            console.log(err);
            res.send({
                success: false
            });
        })
    },
    login: function(req, res) {
        service.user.login(req.body.username, req.body.password).then(function(result) {
            console.log(result);
            //service.user.login('starkwang', '123456').then(function(result) {
            req.session.regenerate(function() {
                req.session.login = true;
                req.session.username = result.attributes.username;
                req.session.userid = result.attributes.timeStamp;
                res.send({
                    success: true
                });
            });

        }, function(err) {
            res.send({
                success: false
            });
        })
    },
    logout: function(req, res) {
        res.clearCookie('connect.sid');
        res.send({
            success: true
        })
    }
};

module.exports = {
    item: item,
    user: user
}
