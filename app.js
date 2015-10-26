var express = require('express');
var app = express();
var alphabet = require('alphabetjs');
var promise = require('bluebird');
var session = require('express-session');
var render = {
    index: require('./src/render/indexRender')
};
var service = {
    login: require('./src/module/login')
};

app.set('view engine', 'jade');
app.set('views', './client/template');

app.use('/static', express.static('client/build/'));

app.use(session({
    secret: 'wangweijia',
    cookie: {
        maxAge: 60000
    }
}));


app.get('/', render.index);
app.post('/login', service.login);


app.listen(3000);
console.log(alphabet('FUDAN', 'planar'));
