var angular = require('angular');
require('./angular-animate.min');
require('./baseService');
var starkAPP = angular.module('starkAPP', [
    'ngAnimate',
    'baseService',
    'infinite-scroll'
]);
starkAPP.controller('headerController', require('../header/headerController.js'));
starkAPP.controller('waterfooController', require('../waterfoo/waterfooController.js'));
starkAPP.controller('detailBoxController', require('../detail-box/detail-box-controller.js'));
starkAPP.controller('publishController', require('../publish/publishController.js'));
module.exports = starkAPP;
