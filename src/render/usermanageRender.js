function render(req, res) {
    if (!req.session.login) {
        res.redirect('/login');
    } else {
        res.render('usermanage', {
            session: req.session ? req.session : {}
        });
    }

}
module.exports = render;
