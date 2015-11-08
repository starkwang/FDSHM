function render(req, res) {
    var sess = req.session
    if (sess.views) {
        res.render('detail', {
            pageTitle: 'success'
        });
    }else{
        res.render('detail', {
            pageTitle: 'not login'
        });
    }
}
module.exports = render;