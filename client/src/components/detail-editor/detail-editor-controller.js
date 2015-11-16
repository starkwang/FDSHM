module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.detailEditorIsShow = false;
    $scope.item = {};
    var id;
    $scope.$on('showDetailEditor', function(target, data) {
        //console.log(a,b,c);
        $scope.detailEditorIsShow = true;
        $scope.detailEditorLoaderIsShow = true;
        id = data;
        BaseService.item.get(id).then(function(result) {
            console.log(result);
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
        if (!($scope.item.name && $scope.item.detail && $scope.item.category && $scope.item.price && $scope.item.tel)) {
            alert('有必要信息缺失哦~')
            return;
        }
        BaseService.item.update(id, $scope.item).then(function(result){
            console.log(result);
            if(result.data){
                alert('修改成功！');
                window.location.reload();
            }else{
                alert('修改失败');
            }
        });
    }


}]
