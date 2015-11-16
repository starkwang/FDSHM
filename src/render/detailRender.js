service = require('../service/service');

function render(req, res) {
    service.item.get(req.params.pubTimeStamp).then(function(result) {
        if (result.length >= 1) {
            var item = result[0];
            res.render('detail', {
                session: req.session ? req.session : {},
                detailBox: {
                    images: item.get('imgPaths'),
                    name: item.get('name'),
                    tel: item.get('tel'),
                    location: item.get('location'),
                    price: item.get('price'),
                    detail: item.get('detail').split('\n'),
                    qq: item.get('qq'),
                    wechat: item.get('wechat'),
                    stuNo: item.get('stuNo'),
                    pubTime: item.createdAt.toLocaleDateString() + '  ' + item.createdAt.toLocaleTimeString()
                }

            });
        } else {
            res.redirect('/');
        }
    });
}
module.exports = render;
