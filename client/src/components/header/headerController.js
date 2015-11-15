module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.showPublish = function() {
        $rootScope.$broadcast('showPublish');
    }
    $scope.showLogin = function() {
        $rootScope.$broadcast('showLogin');
    }
    $scope.showSignup = function() {
        $rootScope.$broadcast('showSignup');
    }
    $scope.test = function() {
        BaseService.user.login('13307130321@fudan.edu.cn', '123456').then(function(result) {
            console.log(result);
        });
    }
    $scope.test2 = function() {
        BaseService.user.signup('starkwang', '123456', '13307130321@fudan.edu.cn').then(function(result) {
            console.log(result);
        });
    }
    $scope.test3 = function() {
        BaseService.user.logout().then(function(result) {
            console.log(result);
        });
    }
    $scope.logout = function() {
        BaseService.user.logout().then(function(result) {
            window.location.pathname = '/';
        });
    }
}]
