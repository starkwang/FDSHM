var Promise = require("bluebird");
var join = Promise.join;
var fs = Promise.promisifyAll(require("fs"));
var gm = require('gm');
fs.readdirAsync("../img").map(function(fileName) {
    try{
       gm('../img/' + fileName)
        .resize(400)
        .write('../img/small/' + fileName, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("minify image done");
                //service.item.
            }
        }); 
    }catch(e){
        console.log(e);
    }
    
})
