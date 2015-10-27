var starkAPP = require('./app.js');
starkAPP.controller('loginController', ['$scope', function($scope) {
    console.log('aaaaaaaaa');
    $scope.show = function(){
        console.log($scope.key);
    }
}])
module.exports = starkAPP;
