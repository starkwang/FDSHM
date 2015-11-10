function render(req, res) {
    var sess = req.session
    if (sess.views) {
        res.render('index', {
            pageTitle: 'success'
        });
        console.log('login');
    } else {
        res.render('index', {
            pageTitle: 'not login'
        });
        console.log('not login');
    }
}
module.exports = render;
