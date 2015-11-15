function render(req, res) {
    console.log(req.session);
    res.render('index', {
        session: req.session ? req.session : {}
    });
}
module.exports = render;
