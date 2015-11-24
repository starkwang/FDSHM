module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.user = {};
    if (window.location.pathname == '/login') {
        $scope.loginIsShow = true;
    } else {
        $scope.loginIsShow = false;
    }
    $scope.$on('showLogin', function() {
        $scope.loginIsShow = true;
    })
    $scope.changeLoginShow = function($event) {
        console.log($event);
        if ($event.target.id == "change-show" && window.location.pathname != '/login') {
            $scope.loginIsShow = !$scope.loginIsShow;
        }
    }
    $scope.login = function() {
        if (!$scope.user.username || !$scope.user.password) {
            $rootScope.$broadcast('alert', '账号或者密码格式错误');
            return;
        }
        BaseService.user.login($scope.user.username, $scope.user.password).then(function(result) {
            console.log(result);
            if (result.data.success) {
                window.location.pathname = '/';
            } else {
                $rootScope.$broadcast('alert', '账号不存在，或者密码错误！');
            }
        });
    }
    $scope.showSignup = function(){
        $rootScope.$broadcast('showSignup');
    }
    $scope.showForget = function(){
        $rootScope.$broadcast('showForget');
    }
}]
