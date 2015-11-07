module.exports = ['$scope', function($scope) {
    console.log('aaaaaaaaa');
    $scope.publishIsShow = false;
    $scope.changePublishShow = function($event) {
        if ($event.target.id == "change-show") {
            $scope.publishIsShow = !$scope.publishIsShow;
        }
    };
}]
