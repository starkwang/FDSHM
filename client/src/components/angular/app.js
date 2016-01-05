var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?b6cb5003addb8959e7e25b8fea13667e";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
var angular = require('angular');
require('./angular-animate.min');
require('./baseService');
require('./userInfoService');
require('../back-to-top/back-to-top.js');
var starkAPP = angular.module('starkAPP', [
    'ngAnimate',
    'baseService',
    'userInfo',
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
starkAPP.controller('changeNameController', require('../change-name/changeNameController.js'));
starkAPP.controller('commentController', require('../comment/commentController.js'));
module.exports = starkAPP;
