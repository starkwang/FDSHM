var express = require('express');
var app = express();
var alphabet = require('alphabetjs');
var promise = require('bluebird');
var session = require('express-session');
var render = {
    index: require('./src/render/indexRender'),
    detail: require('./src/render/detailRender')
};
var service = {
    login: require('./src/module/login')
};

app.set('view engine', 'jade');
app.set('views', './client/src/template');

app.use('/static', express.static('client/build/'));
app.use('/img', express.static('img'));

app.use(session({
    secret: 'wangweijia',
    cookie: {
        maxAge: 60000
    }
}));


app.get('/', render.index);
app.get('/item/', render.detail);

app.post('/login', service.login);
app.get('/api/item/collection', function(req, res) {
    var result = [];
    for (var i = 0; i < 30; i++) {
        var tmp = Math.floor(Math.random() * 3);
        result.push({
            image: '/img/' + tmp + '.png',
            price: Math.floor(Math.random() * 1000),
            content: '商品标题商品标题商品标题',
            id: '2134534'
        });
    }
    res.send(result);
    res.end();

});


app.listen(3000);
console.log(alphabet('FUDAN', 'planar'));
