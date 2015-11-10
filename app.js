var express = require('express');
var app = express();
var multer = require('multer');
var alphabet = require('alphabetjs');
var bodyParser = require('body-parser');
var promise = require('bluebird');
var session = require('express-session');
var service = require('./src/service/service');
var render = {
    index: require('./src/render/indexRender'),
    detail: require('./src/render/detailRender')
};



app.set('view engine', 'jade');
app.set('views', './client/src/template');

//静态资源
app.use('/static', express.static('client/build/'));
app.use('/img', express.static('img'));


//一些中间件
app.use(session({
    secret: 'wangweijia',
    cookie: {
        maxAge: 60000
    }
}));
app.use(bodyParser());


//渲染
app.get('/', render.index);
app.get('/item/', render.detail);


//API
//app.get('/login', service.login);
app.get('/api/item/collection', function(req, res) {

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
    // var result = [];
    // for (var i = 0; i < 30; i++) {
    //     var tmp = Math.floor(Math.random() * 3);
    //     result.push({
    //         image: '/img/' + tmp + '.png',
    //         price: Math.floor(Math.random() * 1000),
    //         content: '商品标题商品标题商品标题',
    //         id: '2134534'
    //     });
    // }
    // res.send(result);
    // res.end();

});
app.post('/api/item/publish', function(req, res) {
    service.item.publish(req.body).then(function(result) {
        console.log(result);
        res.send({
            success: true,
            id: result.id
        })
    })
});



var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './img')
    },
    filename: function(req, file, cb) {
        var tmp = file.originalname.split('.');

        var type = tmp[tmp.length - 1];
        cb(null, file.fieldname + '-' + Date.now() + '.' + type);
    }
});
var upload = multer({
    storage: storage
});
app.post('/api/upload', upload.single('file'), function(req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    console.log(req.file);
    res.send({
        success: true,
        path: '/' + req.file.path
    });
})


app.listen(3000);
console.log(alphabet('FUDAN', 'planar'));
