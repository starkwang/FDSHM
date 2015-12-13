var service = require('../service/service');
var preCompile = require('./preCompile');
var moment = require('moment');
var nameFliter = require('./categoryNameFliter');
function render(req, res) {
    var templateData = {}
    service.item.get(req.params.pubTimeStamp).then(function(result) {
        if (result.length > 0) {
            var item = result[0];
            templateData.session = req.session ? req.session : {};
            templateData.detailBox = {
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
                noBargain: item.get('noBargain'),
                category: item.get('category'),
                categoryEn: nameFliter.ch2en(item.get('category')),
                //publisher_name: item.get('publisher_name'),
                publisher_id: item.get('publisher_id'),
                pubTime: moment(parseInt(item.get('pubTimeStamp'))).format('YYYY/MM/DD HH:mm:ss')

            }
            return service.user.getUserByUserId(item.get('publisher_id'));
        } else {
            return false;
        }
    }).then(function(user) {
        if (user) {
            templateData.detailBox.publisher_name = user == "none" ? "none" : user.get('name');
            var html = preCompile.detail(templateData);
            res.send(html);
        } else {
            res.redirect('/');
        }
    });
}
module.exports = render;
