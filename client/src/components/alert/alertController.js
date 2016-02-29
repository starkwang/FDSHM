module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.$on('alert', function(event, text) {
        $scope.alertIsShow = true;
        $scope.text = text;
    });
    $scope.$on('notice', function(event, params) {
        $scope.noticeIsShow = true;
        $scope.text = params.text;
        $scope.link = params.link;
        $scope.linkText = params.linkText;
        $scope.showVerifyMail = params.showVerifyMail;
    });
    $scope.close = function() {
        $scope.alertIsShow = false;
        $scope.noticeIsShow = false;
    }

    $scope.showVerify = function(){
        $scope.noticeIsShow = false;
        $rootScope.$broadcast('showVerifyMail');
    }
}]
