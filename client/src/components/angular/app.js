var angular = require('angular');
require('./angular-animate.min');
require('./baseService');
require('../back-to-top/back-to-top.js');
var starkAPP = angular.module('starkAPP', [
    'ngAnimate',
    'baseService',
    'infinite-scroll',
    'angular.backtop'
]);
starkAPP.controller('headerController', require('../header/headerController.js'));
starkAPP.controller('sidebarController', require('../sidebar/sidebarController.js'));
starkAPP.controller('waterfooController', require('../waterfoo/waterfooController.js'));
starkAPP.controller('detailBoxController', require('../detail-box/detail-box-controller.js'));
starkAPP.controller('publishController', require('../publish/publishController.js'));
starkAPP.controller('loginController', require('../login/loginController.js'));
starkAPP.controller('signupController', require('../signup/signupController.js'));
starkAPP.controller('detailEditorController', require('../detail-editor/detail-editor-controller.js'));
starkAPP.controller('alertController', require('../alert/alertController.js'));
starkAPP.controller('verifyMailController', require('../verifymail/verifymailController.js'));
starkAPP.controller('forgetController', require('../forget/forgetController.js'));

module.exports = starkAPP;
