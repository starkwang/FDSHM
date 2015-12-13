function ch2en(ch) {
    switch (ch) {
        case '闲置数码':
            return 'digital';
            break;
        case '校园代步':
            return 'ride';
            break;
        case '电器日用':
            return 'commodity';
            break;
        case '图书教材':
            return 'book';
            break;
        case '美妆衣物':
            return 'makeup';
            break;
        case '运动棋牌':
            return 'sport';
            break;
        case '票券小物':
            return 'smallthing';
            break;
    }
}

function en2ch(en) {
    switch (en) {
        case 'digital':
            return '闲置数码';
            break;
        case 'ride':
            return '校园代步';
            break;
        case 'commodity':
            return '电器日用';
            break;
        case 'book':
            return '图书教材';
            break;
        case 'makeup':
            return '美妆衣物';
            break;
        case 'sport':
            return '运动棋牌';
            break;
        case 'smallthing':
            return '票券小物';
            break;
    }
}
module.exports = {
    en2ch:en2ch,
    ch2en:ch2en
}