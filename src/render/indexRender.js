function render(req, res) {
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
}
module.exports = render;