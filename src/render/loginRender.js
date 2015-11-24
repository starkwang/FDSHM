preCompile = require('./preCompile');

function render(req, res) {
    if (req.session.login) {
        res.redirect('/');
    } else {
        res.send(preCompile.login());
    }
}
module.exports = render;
