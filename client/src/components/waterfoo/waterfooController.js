require('../waterfoo/ng-infinite-scroll.min.js');
module.exports = ['$scope', 'BaseService', function($scope, BaseService) {

    $scope.items = [];
    var now = 0;
    var everyPullAmount = 20;
    $scope.isBusy = false;
    $scope.getItem = function() {
        $scope.isBusy = true;
        BaseService.waterfoo.getItem(now * everyPullAmount, everyPullAmount).then(function(result) {
            console.log('pull!');
            $scope.items = $scope.items.concat(result.data);
            $scope.isBusy = false;
        });
        now++;
    }
    $scope.getItem();

}]
