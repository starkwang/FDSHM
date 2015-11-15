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
            alert('请填入正确的复旦邮箱！');
            return;
        }
        if (!$scope.signupInfo.password || !$scope.signupInfo.name) {
            alert('密码或用户名不能为空！');
            return;
        }
        BaseService.user.signup($scope.signupInfo.name, $scope.signupInfo.password, $scope.signupInfo.email).then(function(result) {
            if (result.data.success) {
                alert('注册成功！');
                $scope.signupIsShow = false;
                $scope.user.username = $scope.signupInfo.email;
                $scope.loginIsShow = true;
            } else {
                alert('注册失败');
            }
        });
    }
}]
