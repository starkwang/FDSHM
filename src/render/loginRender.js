preCompile = require('./preCompile');

function render(req, res) {
    res.send(preCompile.login({
        session: req.session ? req.session : {}
    }));
    // res.render('login', {
    //     session: req.session ? req.session : {}
    // });
}
module.exports = render;
