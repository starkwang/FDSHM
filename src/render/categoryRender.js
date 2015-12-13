var preCompile = require('./preCompile');
var nameFliter = require('./categoryNameFliter');
function render(req, res) {
    var sess = req.session;
    var category = nameFliter.en2ch(req.params.category);
    res.send(preCompile.category({
        session: req.session ? req.session : {},
        category: category
    }));
    // res.render('category', {
    //     session: req.session ? req.session : {},
    //     category: category
    // });
}
module.exports = render;
