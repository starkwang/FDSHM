module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {

    $scope.changeNameIsShow = false;

    $scope.$on('showChangeName', function() {
        $scope.changeNameIsShow = true;
    })

    $scope.setName = function() {
        if ($scope.name) {
            BaseService.user.setName($scope.name).then(function(result) {
                if(result.data.success){
                    $rootScope.$broadcast('alert', '用户名修改成功！');
                    setTimeout(function(){
                        window.location.reload(true);
                    }, 1000);
                }else{
                    $rootScope.$broadcast('alert', result.data.message);
                }
            })
        }else{
            $rootScope.$broadcast('alert', '用户名不能够为空~');
        }

    }

    $scope.changeChangeNameShow = function($event) {
        if ($event.target.id == "change-show") {
            $scope.changeNameIsShow = !$scope.changeNameIsShow;
        }
    }
}]
