var express = require('express');
var app = express();
var multer = require('multer');
var alphabet = require('alphabetjs');
var bodyParser = require('body-parser');
var promise = require('bluebird');
var session = require('express-session');

var render = {
    index: require('./src/render/indexRender'),
    detail: require('./src/render/detailRender'),
    category: require('./src/render/categoryRender')
};
var api = require('./src/api/api');

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
app.get('/item/:id', render.detail);
app.get('/category/:category', render.category)

//API
//app.get('/login', service.login);
app.get('/api/item/collection', api.item.collection);
app.post('/api/item/publish', api.item.publish);



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
});

// AV.Cloud.requestSmsCode({
//     mobilePhoneNumber: '13316919664',
//     name: 'FDSHM',
//     op: '某种操作',
//     ttl: 10
// }).then(function(result) {
//     //发送成功
//     console.log(result);
// }, function(err) {
//     //发送失败
//     console.log(err);
// });


app.listen(3000);
console.log(alphabet('FUDAN', 'planar'));
