module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.signupIsShow = false;
    $scope.checkTelIsShow = true;
    $scope.$on('showSignup', function() {
        $scope.signupIsShow = true;
    })

    $scope.signupInfo = {};
    $scope.changeSignupShow = function($event) {
        console.log($event);
        if ($event.target.id == "change-show") {
            $scope.signupIsShow = !$scope.signupIsShow;
        }
    }

    $scope.checkTel = function() {
        if (!$scope.signupInfo.tel) {
            $rootScope.$broadcast('alert', '请填入正确的手机号码！');
            return;
        }

        BaseService.user.requsetTelVerify($scope.signupInfo.tel).then(function(result) {
            if (result.data.success) {
                $scope.checkTelIsShow = false;
                $scope.captchaIsShow = true;
                $scope.signupBtnIsShow = true;
            } else {
                $rootScope.$broadcast('alert', result.data.message);
            }
        });
    }

    $scope.showLogin = function(){
        $scope.signupIsShow = false;
        $rootScope.$broadcast('showLogin');
    }

    $scope.signup = function() {
        if (!$scope.signupInfo.tel) {
            $rootScope.$broadcast('alert', '请填入正确的手机号码！');
            return;
        }
        if($scope.signupInfo.password != $scope.signupInfo.password2){
            $rootScope.$broadcast('alert', '两次输入的密码不一致哦~');
            return;
        }
        if (!$scope.signupInfo.password || !$scope.signupInfo.name) {
            $rootScope.$broadcast('alert', '密码或用户名不能为空！');
            return;
        }
        BaseService.user.signup($scope.signupInfo.name, $scope.signupInfo.password, $scope.signupInfo.tel, $scope.signupInfo.captcha).then(function(result) {
            if (result.data.success) {
                $rootScope.$broadcast('alert', '注册成功！');
                setTimeout(function() {
                    window.location.reload();
                }, 1500);
            } else {
                $rootScope.$broadcast('alert', '注册失败');
            }
        });
    }
}]
