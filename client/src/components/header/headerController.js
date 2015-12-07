module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    if (window.location.pathname == '/usermanage/') {
        $scope.categoryIsHidden = true;
    }
    $scope.moreVertIsShow = false;
    $scope.amount = {};
    $('[data-position]').tooltip({
        delay: 50
    });
    $scope.showPublish = function() {
        $rootScope.$broadcast('showPublish');
    }
    $scope.showLogin = function() {
        $rootScope.$broadcast('showLogin');
    }
    $scope.showSignup = function() {
        $rootScope.$broadcast('showSignup');
    }
    $scope.changeMoreVertShow = function() {
        console.log('message');
        $scope.moreVertIsShow = !$scope.moreVertIsShow;
    }
    $scope.showVerifyMail = function() {
        $rootScope.$broadcast('showVerifyMail');
    }
    $scope.logout = function() {
        BaseService.user.logout().then(function(result) {
            window.location.pathname = '/';
        });
    }
}]
