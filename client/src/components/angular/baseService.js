angular = require('angular');
angular.module('baseService', [])
    .factory('BaseService', ['$rootScope', '$http', '$q',
        function($rootScope, $http) {
            function GET(url, params) {
                return $http({
                    method: 'GET',
                    url: url,
                    params: params
                });
            }

            function POST(url, data) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: data
                })
            }
            var item = {
                publish: function(params) {
                    return POST('/api/item/publish', params);
                },
                uploadImg: function(file, callback) {
                    var fd = new FormData();
                    fd.append("file", file);
                    var xhr = new XMLHttpRequest();
                    xhr.addEventListener("load", callback, false);
                    xhr.open("POST", "/api/upload");
                    xhr.send(fd);
                }
            }
            var waterfoo = {
                getItem: function(start, amount, category) {
                    var params = {
                        start: start,
                        amount: amount,
                        category: category
                    }
                    return GET('/api/item/collection', params);
                }
            };
            var user = {
                login: function(username, password) {
                    return POST('/api/user/login', {
                        username: 'starkwang',
                        password: '123456'
                    })
                },
                signup: function(username, password, email) {
                    return POST('/api/user/signup', {
                        username: username,
                        password: password,
                        email: email
                    })
                },
                logout: function() {
                    return POST('/api/user/logout');
                },
            }
            return {
                waterfoo: waterfoo,
                item: item,
                user: user
            };
        }
    ])
