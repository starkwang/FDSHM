function render(req, res) {
    if (!req.session.login) {
        res.redirect('/login');
    } else {
        res.send(preCompile.usermanage({
            session: req.session ? req.session : {}
        }));
    }

}
module.exports = render;
