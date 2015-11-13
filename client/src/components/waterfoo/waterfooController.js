require('../waterfoo/ng-infinite-scroll.min.js');
module.exports = ['$scope', 'BaseService', '$location', function($scope, BaseService, $location) {

    var now = 0;
    var everyPullAmount = 20;
    $scope.items = [];

    //不同页的瀑布流不一样
    //闲置数码 - digital
    //校园代步 - ride
    //电器日用 - commodity
    //图书教材 - book
    //美妆衣物 - makeup
    //运动棋牌 - sport
    //票券小物 - smallthing
    var category;
    switch (window.location.pathname) {
        case '/category/digital':
            category = '闲置数码'
            break;
        case '/category/ride':
            category = '校园代步'
            break;
        case '/category/commodity':
            category = '电器日用'
            break;
        case '/category/book':
            category = '图书教材'
            break;
        case '/category/makeup':
            category = '美妆衣物'
            break;
        case '/category/sport':
            category = '运动棋牌'
            break;
        case '/category/smallthing':
            category = '票券小物'
            break;
        default:
            category = 'all'
    }

    $scope.getItem = function() {
        $scope.isBusy = $scope.loaderShow = true;
        BaseService.waterfoo.getItem(now * everyPullAmount, everyPullAmount, category).then(function(result) {
            if (result.data.length === 0) {
                $scope.isBusy = true;
                $scope.loaderShow = false;
            } else {
                $scope.items = $scope.items.concat(result.data);
                $scope.isBusy = $scope.loaderShow = false;
            }
        });
        now++;
    }


    function init() {
        $scope.items = [];
        now = 0;
        everyPullAmount = 20;
        $scope.isBusy = false;
        $scope.getItem();
    }

    init();


    $scope.$on('item-publish', function() {
        init();
    });
}]
