function render(req, res) {
    res.render('login', {
        session: req.session ? req.session : {}
    });
}
module.exports = render;
