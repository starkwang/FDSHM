module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.detailEditorIsShow = false;
    $scope.item = {};
    $scope.$on('showDetailEditor',function(){
        $scope.detailEditorIsShow = true;
    })
    $scope.changeDetailEditorShow = function($event) {
        if ($event.target.id == "change-show") {
            $scope.detailEditorIsShow = !$scope.detailEditorIsShow;
        }
    };


}]
