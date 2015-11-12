require('../waterfoo/ng-infinite-scroll.min.js');
module.exports = ['$scope', 'BaseService', function($scope, BaseService) {


    var now = 0;
    var everyPullAmount = 20;
    $scope.items = [];

    $scope.getItem = function() {
        $scope.isBusy = true;
        BaseService.waterfoo.getItem(now * everyPullAmount, everyPullAmount).then(function(result) {
            console.log('pull!');
            $scope.items = $scope.items.concat(result.data);
            $scope.isBusy = false;
        });
        now++;
        console.log($scope.items);
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
