function render(req, res) {
    var sess = req.session;
    var category;
    switch (req.params.category) {
        case 'digital':
            category = '闲置数码'
            break;
        case 'ride':
            category = '校园代步'
            break;
        case 'commodity':
            category = '电器日用'
            break;
        case 'book':
            category = '图书教材'
            break;
        case 'makeup':
            category = '美妆衣物'
            break;
        case 'sport':
            category = '运动棋牌'
            break;
        case 'smallthing':
            category = '票券小物'
            break;
    }
    res.render('category', {
        session: req.session ? req.session : {},
        category: category
    });
}
module.exports = render;
