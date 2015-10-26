var express = require('express');
var app = express();
var alphabet = require('alphabetjs');
var promise = require('bluebird');
var session = require('express-session');


app.set('view engine', 'jade');
app.set('views', './client/template');

app.use('/static', express.static('client/build/'));

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    }
}));

app.get('/', function(req, res) {
    var sess = req.session
    if (sess.views) {
        res.render('index', {
            pageTitle: 'success'
        });
    }else{
        res.render('index', {
            pageTitle: 'not login'
        });
    }
});
app.get('/login', function(req, res) {
    var sess = req.session
    sess.views = 1;
    res.end('welcome to the session demo. refresh!');
});


app.listen(3000);
console.log(alphabet('FUDAN', 'planar'));
