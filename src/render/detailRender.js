service = require('../service/service');
preCompile = require('./preCompile');

function render(req, res) {
    service.item.get(req.params.pubTimeStamp).then(function(result) {
        if (result.length >= 1) {
            var item = result[0];
            var html = preCompile.detail({
                session: req.session ? req.session : {},
                detailBox: {
                    status: item.get('status'),
                    images: item.get('imgPaths'),
                    name: item.get('name'),
                    tel: item.get('tel'),
                    location: item.get('location'),
                    price: item.get('price'),
                    detail: item.get('detail').split('\n'),
                    qq: item.get('qq'),
                    wechat: item.get('wechat'),
                    stuNo: item.get('stuNo'),
                    publisher_name: item.get('publisher_name'),
                    publisher_id: item.get('publisher_id'),
                    pubTime: item.createdAt.toLocaleDateString() + '  ' + item.createdAt.toLocaleTimeString()
                }
            });
            res.send(html);
            // res.render('detail', {
            //     session: req.session ? req.session : {},
            //     detailBox: {
            //         images: item.get('imgPaths'),
            //         name: item.get('name'),
            //         tel: item.get('tel'),
            //         location: item.get('location'),
            //         price: item.get('price'),
            //         detail: item.get('detail').split('\n'),
            //         qq: item.get('qq'),
            //         wechat: item.get('wechat'),
            //         stuNo: item.get('stuNo'),
            //         publisher_name: item.get('publisher_name'),
            //         publisher_id: item.get('publisher_id'),
            //         pubTime: item.createdAt.toLocaleDateString() + '  ' + item.createdAt.toLocaleTimeString()
            //     }

            // });
        } else {
            res.redirect('/');
        }
    });
}
module.exports = render;
