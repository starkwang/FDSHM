function render(req, res) {
    res.render('index', {
        session: req.session ? req.session : {}
    });
}
module.exports = render;
