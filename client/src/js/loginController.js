var starkAPP = require('./app.js');
starkAPP.controller('loginController', ['$scope', function($scope) {
    console.log('fsafljsa');
    $scope.show = function(){
        console.log($scope.key);
    }
}])
module.exports = starkAPP;
