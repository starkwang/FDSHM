module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.signupIsShow = false;
    $scope.$on('showSignup',function(){
        $scope.signupIsShow = true;
    })
    $scope.changeSignupShow = function($event) {
        console.log($event);
        if ($event.target.id == "change-show") {
            $scope.signupIsShow = !$scope.signupIsShow;
        }
    }
    $scope.signup = function() {
        if (!$scope.signupInfo.email) {
            $rootScope.$broadcast('alert', '请填入正确的复旦邮箱！');
            return;
        }
        if (!$scope.signupInfo.password || !$scope.signupInfo.name) {
            $rootScope.$broadcast('alert', '密码或用户名不能为空！');
            return;
        }
        BaseService.user.signup($scope.signupInfo.name, $scope.signupInfo.password, $scope.signupInfo.email).then(function(result) {
            if (result.data.success) {
                $rootScope.$broadcast('alert', '注册成功！');
            } else {
                $rootScope.$broadcast('alert', '注册失败');
            }
        });
    }
}]
