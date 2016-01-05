angular = require('angular');
angular.module('userInfo', [])
    .factory('UserInfo', ['$rootScope', '$http', 'BaseService',
        function($rootScope, $http, BaseService) {
            var data = {};

            function init() {
                BaseService.GET('/api/user/local_info').then(function(result) {
                    data.login = result.data.login;
                    data.userName = result.data.userName;
                    data.userID = result.data.userID;
                    $rootScope.$broadcast('userInfoGet');
                });

            }
            return {
                init: init,
                data: data
            }
        }
    ])
