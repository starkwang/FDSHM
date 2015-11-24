var express = require('express');
var app = express();
var multer = require('multer');
var alphabet = require('alphabetjs');
var bodyParser = require('body-parser');
var promise = require('bluebird');
var session = require('express-session');
var morgan = require('morgan');
var moment = require('moment');
var RedisStore = require('connect-redis')(session);



var render = {
    index: require('./src/render/indexRender'),
    detail: require('./src/render/detailRender'),
    category: require('./src/render/categoryRender'),
    login: require('./src/render/loginRender'),
    usermanage: require('./src/render/usermanageRender')
};

var api = require('./src/api/api');

app.set('view engine', 'jade');
app.set('views', './client/src/template');

app.use(morgan('dev'))

//静态资源
app.use('/static', express.static('client/build/'));
app.use('/img', express.static('img'));


//一些中间件
app.use(session({
    store: new RedisStore({
        "host": "127.0.0.1",
        "port": "6379",
        "ttl": 60 * 60 * 24 * 30, //Session的有效期为30天
    }),
    secret: 'wangweijia'
}));
app.use(bodyParser());


//渲染
app.get('/', render.index);
app.get('/login/', render.login);
app.get('/item/:pubTimeStamp', render.detail);
app.get('/category/:category', render.category);
app.get('/usermanage/', render.usermanage);


//API
app.get('/api/item/collection', api.item.collection);
app.post('/api/item/publish', api.item.publish);
app.post('/api/item/equal_to', api.item.equalTo);
app.get('/api/item/get', api.item.get);
app.post('/api/item/update', api.item.update);
app.post('/api/item/set_status', api.item.setStatus);

app.post('/api/user/signup', api.user.signup);
app.post('/api/user/request_tel_verify', api.user.requestTelVerify);
app.post('/api/user/login', api.user.login);
app.post('/api/user/logout', api.user.logout);
app.post('/api/user/my_item', api.user.myItem);
app.post('/api/user/request_mail_verify', api.user.requestMailVerify);
app.get('/api/user/mail_verify/:objectId', api.user.mailVerify);
app.post('/api/user/request_password_reset',api.user.requestPasswordReset);
app.post('/api/user/reset_password',api.user.resetPassword);


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
console.log(moment(1448249498353).format('YYYY/MM/DD HH:mm:ss'));
