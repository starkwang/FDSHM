service = require('../service/service');

function render(req, res) {
    service.item.get(req.params.id).then(function(result) {
        console.log(result);
        var item = result[0];
        res.render('detail', {
            detailBox: {
                images: item.get('imgPaths'),
                name: item.get('name'),
                tel: item.get('tel'),
                location: item.get('location'),
                price: item.get('price'),
                detail: item.get('detail'),
                pubTime: item.createdAt.toLocaleDateString()+'  '+item.createdAt.toLocaleTimeString()
            }

        });
    });
}
module.exports = render;
