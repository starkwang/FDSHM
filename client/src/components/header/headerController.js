module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    if(window.location.pathname == '/usermanage/'){
        $scope.categoryIsHidden = true;
    }
    $scope.moreVertIsShow = false;
    $('[data-position]').tooltip({delay: 50});
    switch(window.location.pathname){
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
    $scope.showPublish = function() {
        $rootScope.$broadcast('showPublish');
    }
    $scope.showLogin = function() {
        $rootScope.$broadcast('showLogin');
    }
    $scope.showSignup = function() {
        $rootScope.$broadcast('showSignup');
    }
    $scope.changeMoreVertShow = function(){
        console.log('message');
        $scope.moreVertIsShow = !$scope.moreVertIsShow;
    }
    $scope.showVerifyMail = function(){
        $rootScope.$broadcast('showVerifyMail');
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
