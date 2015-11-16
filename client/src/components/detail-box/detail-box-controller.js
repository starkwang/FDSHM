module.exports = ['$scope', '$rootScope', function($scope, $rootScope) {
    $('.slider').slider({
        full_width: true
    });
    $scope.detialBox = {};
    var item_id = window.location.pathname.split('/')[2];
    $scope.showDetailEditor = function() {
        $rootScope.$broadcast('showDetailEditor', item_id)
    }
    console.log($scope);
}]
