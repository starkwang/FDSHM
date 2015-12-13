module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.verifyMailIsShow = false;
    $scope.$on('showVerifyMail', function() {
        $scope.verifyMailIsShow = true;
    })
    $scope.changeVerifyMailShow = function($event) {
        if ($event.target.id == "change-show") {
            $scope.verifyMailIsShow = !$scope.verifyMailIsShow;
        }
    }

    $scope.requestVerifyMail = function(){
        if($scope.mailAddress){
            BaseService.user.requestMailVerify($scope.mailAddress).then(function(result){
                if(result.data.success){
                    $rootScope.$broadcast('alert', '我们向你的邮箱发送了一封验证邮件，快去查收哦~');
                }else{
                    $rootScope.$broadcast('alert', '哎呀失败了 T^T');
                }
            });
        }else{
            $rootScope.$broadcast('alert', '请输入正确的复旦邮箱 0v0');
        }
        
    }

}]
