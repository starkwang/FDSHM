var promise = require('bluebird');
var fs = promise.promisifyAll(require('fs'));
var jade = require('jade');

var Render = {};

var basePath = './client/src/template/';

var template = ['category', 'detail', 'index', 'login', 'usermanage'];

// var files = [];
// template.forEach(function(template) {
//     files.push(basePath + template + '.jade');
// });

template.forEach(function(template) {
    console.log(basePath + template + '.jade');
    Render[template] = jade.compileFile(basePath + template + '.jade',{
        compileDebug:true
    });
})

console.log(Render);
//var files = [basePath + 'category.jade', basePath + 'detail.jade', basePath + 'index.jade', basePath + 'login.jade', basePath + 'usermanage.jade'];
// var collection = [];
// for (var i = 0; i < files.length; i++) {
//     collection.push(fs.readFileAsync(files[i], "utf-8"));
// }
// promise.each(collection, function(item, index) {
//     console.log(item, index);
//     Render[template[index]] = jade.compile(item,)
// });
// .then(function(result, index) {
//     console.log(result,index);
//     // template.forEach(function(template) {
//     //     Render[template] = jade.complie('result')
//     // });
//     console.log("all the files were created");
// });


module.exports = Render;
