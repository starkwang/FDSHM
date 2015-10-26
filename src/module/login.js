function login(req, res) {
    var sess = req.session
    sess.views = 1;
    res.end('welcome to the session demo. refresh!');
}
module.exports = login;