var angular = require('angular');
require('./angular-animate.min.js');
var starkAPP = angular.module('starkAPP', [
    'ngAnimate'
]);
starkAPP.controller('headerController', require('../header/headerController.js'));
module.exports = starkAPP;
