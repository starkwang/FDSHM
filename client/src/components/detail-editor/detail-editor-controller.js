module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.detailEditorIsShow = false;
    $scope.item = {};
    var id;
    $scope.$on('showDetailEditor', function(target, data) {
        $scope.detailEditorIsShow = true;
        $scope.detailEditorLoaderIsShow = true;
        id = data;
        BaseService.item.get(id).then(function(result) {
            if (result.data) {
                $scope.detailEditorLoaderIsShow = false;
                $scope.item = result.data;
                $scope.item.detail = $scope.item.detail.join('\n');
            }
        })
    });
    $scope.changeDetailEditorShow = function($event) {
        if ($event.target.id == "change-show") {
            $scope.detailEditorIsShow = !$scope.detailEditorIsShow;
        }
    };

    $scope.update = function() {
        if (!($scope.item.name && $scope.item.detail && $scope.item.category && $scope.item.price && ($scope.item.tel || $scope.item.wechat || $scope.item.qq))) {
            $rootScope.$broadcast('alert', '有必要信息缺失哦~');
            return;
        }
        BaseService.item.update(id, $scope.item).then(function(result){
            if(result.data.success){
                $rootScope.$broadcast('alert', '修改成功！即将自动刷新页面。');
                setTimeout(function(){
                    window.location.reload();
                }, 2000);
            }else{
                $rootScope.$broadcast('alert', result.data.message);
            }
        });
    }


}]
