var express = require('express');
var app = express();
var alphabet = require('alphabetjs');
var promise = require('bluebird');


app.set('view engine', 'jade');
app.set('views', './client/template');

app.get('/', function(req, res) {
    res.render('index',{pageTitle:'fasjkfha'});
});


app.listen(3000);
console.log(alphabet('FUDAN','planar'));
