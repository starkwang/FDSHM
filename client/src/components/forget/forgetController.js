module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {

    $scope.checkTelIsShow = true;

    $scope.$on('showForget', function() {
        $scope.forgetIsShow = true;
    })

    $scope.checkTel = function() {
        if (!$scope.tel) {
            $rootScope.$broadcast('alert', '请填入正确的手机号码！');
            return;
        }

        BaseService.user.requestPasswordReset($scope.tel).then(function(result) {
            if (result.data.success) {
                $rootScope.$broadcast('alert', '我们向你的手机发送了一条验证短信，请查收~');
                $scope.checkTelIsShow = false;
                $scope.captchaIsShow = true;
            } else {
                $rootScope.$broadcast('alert', result.data.message);
            }
        });
    }

    $scope.resetPassword = function() {
        BaseService.user.resetPassword($scope.captcha, $scope.newPassword).then(function(result) {
            if (result.data.success) {
                $rootScope.$broadcast('alert', '密码重置成功！');
                setTimeout(function(){
                    window.location.reload();
                },1500);
            } else {
                $rootScope.$broadcast('alert', result.data.message);
            }
        })
    }

    $scope.changeForgetShow = function($event) {
        if ($event.target.id == "change-show") {
            $scope.forgetIsShow = !$scope.forgetIsShow;
        }
    }
}]
