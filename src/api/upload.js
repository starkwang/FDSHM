var gm = require('gm');
var service = require('../service/service');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));

function upload(req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    console.log(req.file);

    try {
        var fileName = req.file.path.split('/')[1].split('.')[0];
        var fileType = req.file.path.split('/')[1].split('.')[1];

        fs.readFileAsync('img/' + fileName + '.' + fileType)
            .then(function(file) {
                return fs.writeFileAsync('img/small/' + fileName + '.' + fileType)
            })
            .then(function() {
                gm(req.file.path).resize(400).write('img/small/' + fileName + '.' + fileType, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("minify image done");
                        //service.item.
                    }
                });
            });

    } catch (e) {
        console.log(e);
    }



    res.send({
        success: true,
        path: '/' + req.file.path
    });
}
module.exports = upload;
