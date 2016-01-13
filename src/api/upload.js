var gm = require('gm');

function upload(req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    console.log(req.file);

    try {
        var fileName = req.file.path.split('/')[1].split('.')[0];
        var fileType = req.file.path.split('/')[1].split('.')[1];
        gm(req.file.path).resize(600, 600).write('img/' + fileName + '-small.' + fileType, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("minify image done");
            }
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
