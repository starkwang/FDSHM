module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    switch (window.location.pathname) {
        case '/':
            $scope.isIndex = true;
            break;
        case '/category/digital':
            $scope.isDigital = true;
            break;
        case '/category/ride':
            $scope.isRide = true;
            break;
        case '/category/commodity':
            $scope.isCommodity = true;
            break;
        case '/category/book':
            $scope.isBook = true;
            break;
        case '/category/makeup':
            $scope.isMakeup = true;
            break;
        case '/category/sport':
            $scope.isSport = true;
            break;
        case '/category/smallthing':
            $scope.isSmallthing = true;
            break;
    }
    BaseService.item.getTodayNewItemAmount().then(function(result) {
        // amount = {
        //     digital: 1,
        //     ride: 2,
        //     commodity: 0,
        //     ...
        // }
        $scope.amount = result.data;
    })
}]
