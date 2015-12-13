var preCompile = require('./preCompile');
function render(req, res) {
    if (!req.session.login) {
        res.redirect('/');
    } else {
        res.send(preCompile.usermanage({
            session: req.session ? req.session : {}
        }));
    }

}
module.exports = render;
