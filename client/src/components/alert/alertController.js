module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.$on('alert', function(event,text) {
        console.log(text);
        $scope.alertIsShow = true;
        $scope.text = text;
    })
    $scope.close = function() {
        $scope.alertIsShow = false;
    }
}]